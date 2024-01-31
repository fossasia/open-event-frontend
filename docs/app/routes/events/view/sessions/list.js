import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { capitalize } from 'lodash-es';
import { SESSION_STATES } from 'open-event-frontend/utils/dictionary/sessions';

let sessionStateMapCached = null;

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    if (SESSION_STATES.includes(this.params.session_status)) {
      return capitalize(this.params.session_status);
    } else {
      return this.l10n.t('Session');
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
    let filterOptions = [];
    if (params.search) {
      filterOptions.push({
        or: [
          {
            name : 'title',
            op   : 'ilike',
            val  : `%${params.search}%`
          },
          {
            name : 'track',
            op   : 'has',
            val  : {
              name : 'name',
              op   : 'ilike',
              val  : `%${params.search}%`
            }
          },
          {
            name : 'speakers',
            op   : 'any',
            val  : {
              name : 'name',
              op   : 'ilike',
              val  : `%${params.search}%`
            }
          }
        ]
      });
    }
    if (SESSION_STATES.includes(params.session_status)) {
      filterOptions = [
        {
          name : 'state',
          op   : 'eq',
          val  : params.session_status
        }
      ];
    }

    const store = this.modelFor('events.view');
    const queryObject = {
      include : 'session',
      filter  : [
        {
          name : 'session',
          op   : 'has',
          val  : {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : store.id
            }
          }
        }
      ]
    };
    const feedbacksPromise = this.authManager.currentUser.query('feedbacks', queryObject);

    let queryString = {
      include        : 'speakers,feedbacks,session-type,track',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 25,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    const sessionsPromise = this.asArray(store.query('sessions', queryString));

    const sessionStatesMapPromise = sessionStateMapCached || this.loader.load('sessions/states');

    const [feedbacks, sessions, sessionStateMap] = await Promise.all([feedbacksPromise, sessionsPromise, sessionStatesMapPromise]);

    sessionStateMapCached = sessionStateMap;

    return {
      sessions,
      feedbacks,
      sessionStateMap
    };
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
