import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment-timezone';

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

  async model(params) {
    this.set('params', params);
    const eventDetails = this.modelFor('events.view');
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
    } else {
      if (params.attendees_status !== 'all') {
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
    }
    if (params.filter) {
      if (params.filter === 'discount') {
        filterOptions.pushObject({
          name : 'order',
          op   : 'has',
          val  : {
            name : 'discount_code_id',
            op   : 'isnot',
            val  : null
          }
        });
      } else if (params.filter === 'date' && params.start_date && params.end_date) {
        filterOptions.pushObject({
          name : 'order',
          op   : 'has',
          val  : {
            name : 'created-at',
            op   : 'ge',
            val  : moment.tz(params.start_date, eventDetails.timezone).toISOString()
          }
        });
        filterOptions.pushObject({
          name : 'order',
          op   : 'has',
          val  : {
            name : 'created-at',
            op   : 'le',
            val  : moment.tz(params.end_date, eventDetails.timezone).add(1, 'days').toISOString()
          }
        });
      }
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

    return this.asArray(eventDetails.query('attendees', queryString));
  }
}
