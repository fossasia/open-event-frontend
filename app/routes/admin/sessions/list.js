import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { capitalize } from 'lodash-es';
import { SESSION_STATES } from 'open-event-frontend/utils/dictionary/sessions';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    if ([...SESSION_STATES, 'deleted'].includes(this.params.sessions_state)) {
      return capitalize(this.params.sessions_state);
    } else {
      return this.l10n.t('Session');
    }
  }

  async model(params) {
    this.set('params', params);
    const searchField = 'title';
    let filterOptions = [
      {
        name : 'event',
        op   : 'has',
        val  : {
          name : 'deleted-at',
          op   : 'eq',
          val  : null
        }
      }
    ];
    if (SESSION_STATES.includes(params.sessions_state)) {
      filterOptions = [
        {
          and:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'eq',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              },
              {
                name : 'state',
                op   : 'eq',
                val  : params.sessions_state
              }
            ]
        }
      ];
    } else if (params.sessions_state === 'deleted') {
      filterOptions = [
        {
          or:
            [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'deleted-at',
                  op   : 'ne',
                  val  : null
                }
              },
              {
                name : 'deleted-at',
                op   : 'ne',
                val  : null
              }
            ]
        }
      ];
    }
    filterOptions = this.applySearchFilters(filterOptions, params, searchField);
    let queryString = {
      get_trashed    : true,
      include        : 'event,speakers',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };
    queryString = this.applySortFilters(queryString, params);

    const feedbacksPromise = this.authManager.currentUser.query('feedbacks', {});
    const sessionsPromise = this.asArray(this.store.query('session', queryString));
    const [feedbacks, sessions] = await Promise.all([feedbacksPromise, sessionsPromise]);
    return {
      sessions,
      feedbacks
    };
  }
}
