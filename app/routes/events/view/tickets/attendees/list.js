import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.attendees_status) {
      case 'placed':
        return this.l10n.t('Placed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'expired':
        return this.l10n.t('Expired');
      case 'cancelled':
        return this.l10n.t('Cancelled');
      case 'checkedIn':
        return this.l10n.t('Checked In');
      case 'notCheckedIn':
        return this.l10n.t('Not Checked In');
      case 'all':
        return this.l10n.t('All');
    }
  }

  addDefaultValue(tags) {
    tags.addObject(this.store.createRecord('tag', {
      name       : 'Speakers',
      color      : '#FF0000',
      isReadOnly : true
    }));
    tags.addObject(this.store.createRecord('tag', {
      name       : 'Attendees',
      color      : '#0000FF',
      isReadOnly : true
    }));
    tags.addObject(this.store.createRecord('tag', {
      name       : 'VIPs',
      color      : '#0000FF',
      isReadOnly : true
    }));
    tags.save();
  }

  async model(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.attendees_status === 'checkedIn') {
      filterOptions = [
        {
          name : 'is-checked-in',
          op   : 'eq',
          val  : true
        }
      ];
    } else if (params.attendees_status === 'notCheckedIn') {
      filterOptions = [
        {
          name : 'is-checked-in',
          op   : 'eq',
          val  : false
        }
      ];
    } else if (params.attendees_status === 'all') {
      filterOptions = [];
    } else {
      filterOptions = [
        {
          name : 'order',
          op   : 'has',
          val  : {
            name : 'status',
            op   : 'eq',
            val  : params.attendees_status
          }
        }
      ];
    }
    filterOptions = this.applySearchFiltersExtend(
      filterOptions,
      params,
      [
        'firstname',
        'lastname',
        'email',
        'ticket__name',
        'ticket__price',
        'order__identifier'
      ]);


    let queryString = {
      include        : 'user,order',
      filter         : filterOptions,
      'page[size]'   : params.per_page,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);
    const event = this.modelFor('events.view');
    const tags = await event.query('tags', {});
    if (!tags || tags.length === 0) {
      this.addDefaultValue(tags);
    }
    const attendees = await this.asArray(await event.query('attendees', queryString));
    return {
      tags,
      attendees
    };
  }
}
