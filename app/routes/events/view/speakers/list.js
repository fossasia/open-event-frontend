import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.speakers_status) {
      case 'pending':
        return this.l10n.t('Pending');
      case 'accepted':
        return this.l10n.t('Accepted');
      case 'rejected':
        return this.l10n.t('Rejected');
    }
  }

  beforeModel() {
    this._super(...arguments);
    let event = this.modelFor('events.view');
    let { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || currentUser.email === event.owner.get('email') || event.organizers.includes(currentUser)
      || event.coorganizers.includes(currentUser) || event.trackOrganizers.includes(currentUser)
      || event.registrars.includes(currentUser) || event.moderators.includes(currentUser))) {
      this.transitionTo('public', event.id);
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'name';
    let filterOptions = [];
    if (params.speakers_status === 'pending') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'pending'
          }
        }
      ];
    } else if (params.speakers_status === 'accepted') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'accepted'
          }
        }
      ];
    } else if (params.speakers_status === 'rejected') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'rejected'
          }
        }
      ];
    } else if (params.speakers_status === 'confirmed') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : 'confirmed'
          }
        }
      ];
    } else {
      filterOptions = [];
    }

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);

    let queryString = {
      include        : 'sessions',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };


    queryString = this.applySortFilters(queryString, params);

    return this.asArray(this.modelFor('events.view').query('speakers', queryString));
  }
}
