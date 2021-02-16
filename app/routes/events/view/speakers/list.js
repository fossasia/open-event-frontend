import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { capitalize } from 'lodash-es';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    if (['accepted', 'rejected', 'confirmed', 'withdrawn', 'canceled'].includes(this.params.speakers_status)) {
      return this.l10n.tVar(capitalize(this.params.speakers_status));
    } else if (this.params.speakers_status === 'without_session') {
      return this.l10n.t('Without Session');
    } else {
      return this.l10n.t('All');
    }
  }

  beforeModel() {
    this._super(...arguments);
    const event = this.modelFor('events.view');
    const { currentUser } = this.authManager;
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
    if (params.speakers_status && params.speakers_status !== 'all' && params.speakers_status !== 'without_session') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'any',
          val  : {
            name : 'state',
            op   : 'eq',
            val  : params.speakers_status
          }
        }
      ];
    } else if (params.speakers_status === 'without_session') {
      filterOptions = [
        {
          name : 'sessions',
          op   : 'eq',
          val  : null
        }
      ];
    } else {
      filterOptions = [];
    }

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);

    let queryString = {
      include        : 'sessions',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 25,
      'page[number]' : params.page || 1
    };


    queryString = this.applySortFilters(queryString, params);

    return this.asArray(this.modelFor('events.view').query('speakers', queryString));
  }
}
