import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import moment from 'moment';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @param mode
   * @return {*}
   * @private
   */
  _loadEvents(mode, featured) {
    const filterOptions = [
      {
        and:
        [
          {
            name : 'state',
            op   : 'eq',
            val  : 'published'
          },
          {
            name : 'privacy',
            op   : 'eq',
            val  : 'public'
          }
        ]
      }
    ];

    const dateFilters = [
      {
        name : 'ends-at',
        op   : 'ge',
        val  : moment().toISOString()
      }
    ];

    if (!featured) {
      dateFilters.push({
        name : 'starts-at',
        op   : 'ge',
        val  : moment().toISOString()
      });
    }

    filterOptions.push({
      or: dateFilters
    });

    if (mode === 'filterOptions') {
      return filterOptions;
    } else {
      return this.store.query('event', {
        sort    : 'starts-at',
        include : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter  : filterOptions
      });
    }

  }

  async model() {
    const featuredOptions =  this._loadEvents('filterOptions', true);
    featuredOptions[0].and.push({
      name : 'is-featured',
      op   : 'eq',
      val  : true
    });

    const upcomingEventsFilter = [
      {
        or: [
          {
            name : 'is-featured',
            op   : 'eq',
            val  : true
          },
          {
            name : 'is-promoted',
            op   : 'eq',
            val  : true
          },
          {
            and: [
              {
                name : 'logo-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'original-image-url',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-sub-topic',
                op   : 'ne',
                val  : null
              },
              {
                name : 'event-type',
                op   : 'ne',
                val  : null
              }
            ]
          }
        ]
      }
    ];

    const callForSpeakersFilter = this._loadEvents('filterOptions');
    callForSpeakersFilter[0].and = [
      ...callForSpeakersFilter[0].and,
      ...upcomingEventsFilter,
      {
        name : 'is-sessions-speakers-enabled',
        op   : 'eq',
        val  : true
      },
      {
        name : 'is-demoted',
        op   : 'eq',
        val  : false
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'privacy',
          op   : 'eq',
          val  : 'public'
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'starts-at',
          op   : 'le',
          val  : moment().toISOString()
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'ends-at',
          op   : 'ge',
          val  : moment().toISOString()
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'announcement',
          op   : 'ne',
          val  : null
        }
      }
    ];

    return hash({
      filteredEvents: this.store.query('event', {
        upcoming     : true,
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        cache        : true,
        public       : true,
        'page[size]' : 12
      }),
      featuredEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : featuredOptions,
        cache        : true,
        public       : true,
        'page[size]' : 6
      }),
      callForSpeakersEvents: this.store.query('event', {
        sort         : 'starts-at',
        include      : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter       : callForSpeakersFilter,
        cache        : true,
        public       : true,
        'page[size]' : 6
      })
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    controller.set('featuredEvents', model.featuredEvents);
    this.set('controller', controller);
  }

  @action
  loading(transition) {
    transition.promise.finally(() => {
      if (this.controller) {
        this.controller.set('finishedLoading', true);
      }
    });
    return false;
  }
}
