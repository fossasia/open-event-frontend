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
  _loadEvents(params, mode) {
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

    if (params.location) {
      filterOptions.push({
        name : 'location_name',
        op   : 'ilike',
        val  : `%${params.location}%`
      });
    }

    if (params.event_name) {
      filterOptions.push({
        name : 'name',
        op   : 'ilike',
        val  : `%${params.event_name}%`
      });
    }

    if (params.start_date && params.end_date) {
      filterOptions.push({
        or:
          [
            {
              and: [
                {
                  name : 'starts-at',
                  op   : 'ge',
                  val  : params.start_date
                },
                {
                  name : 'starts-at',
                  op   : 'le',
                  val  : params.end_date
                }
              ]
            },
            {
              and: [
                {
                  name : 'ends-at',
                  op   : 'ge',
                  val  : params.start_date
                },
                {
                  name : 'ends-at',
                  op   : 'le',
                  val  : params.end_date
                }
              ]
            },
            {
              and: [
                {
                  name : 'starts-at',
                  op   : 'le',
                  val  : params.start_date
                },
                {
                  name : 'ends-at',
                  op   : 'ge',
                  val  : params.end_date
                }
              ]
            }
          ]
      });
    } else {
      params.start_date = moment().toISOString();
      filterOptions.push({
        or: [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : params.start_date
          },
          {
            name : 'ends-at',
            op   : 'ge',
            val  : params.start_date
          }
        ]
      });
    }
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

  async model(params) {
    const filterOptions =  this._loadEvents(params, 'filterOptions');
    filterOptions[0].and.push({
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

    const callForSpeakersFilter = this._loadEvents(params, 'filterOptions');
    callForSpeakersFilter[0].and = [
      ...callForSpeakersFilter[0].and,
      ...upcomingEventsFilter,
      {
        name : 'is-sessions-speakers-enabled',
        op   : 'eq',
        val  : true
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
          val  : params.start_date
        }
      },
      {
        name : 'speakers-call',
        op   : 'has',
        val  : {
          name : 'ends-at',
          op   : 'ge',
          val  : params.start_date
        }
      }
    ];

    return hash({
      filteredEvents: this.store.query('event', {
        upcoming : true,
        include  : 'event-topic,event-sub-topic,event-type,speakers-call'
      }),
      featuredEvents: this.store.query('event', {
        sort    : 'starts-at',
        include : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter  : filterOptions
      }),
      callForSpeakersEvents: this.store.query('event', {
        sort    : 'starts-at',
        include : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter  : callForSpeakersFilter
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
  async queryParamsDidChange(change, params) {
    if (this.controller) {
      this.controller.set('filteredEvents', await this._loadEvents(params));
    }
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
