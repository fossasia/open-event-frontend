import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { debounce } from 'lodash-es';
import moment from 'moment-timezone';
import { hash } from 'rsvp';

@classic
export default class EventsRoute extends Route {
  titleToken() {
    return this.l10n.t('Explore Events');
  }

  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @return {*}
   * @private
   */

  _loadEvents(params) {
    const filterOptions = [
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
    ];
    const onlineFilter = {
      and: [
        {
          name : 'online',
          op   : 'eq',
          val  : true
        },
        {
          name : 'location_name',
          op   : 'eq',
          val  : null
        }
      ]
    };
    const locationFilter = {
      and: [
        {
          name : 'location_name',
          op   : params.location ? 'ilike' : 'ne',
          val  : params.location ? `%${params.location}%` : null
        },
        {
          name : 'online',
          op   : 'eq',
          val  : false
        }
      ]
    };
    const mixedFilter = {
      and: [
        {
          name : 'online',
          op   : 'eq',
          val  : true
        },
        {
          name : 'location_name',
          op   : params.location ? 'ilike' : 'ne',
          val  : params.location ? `%${params.location}%` : null
        }
      ]
    };

    if (params.category) {
      filterOptions.push({
        name : 'event-topic',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : params.category
        }
      });
    }

    if (params.sub_category) {
      filterOptions.push({
        name : 'event-sub-topic',
        op   : 'has',
        val  : {
          name : 'slug',
          op   : 'eq',
          val  : params.sub_category
        }
      });
    }

    if (params.event_type) {
      filterOptions.push({
        name : 'event-type',
        op   : 'has',
        val  : {
          name : 'name',
          op   : 'eq',
          val  : params.event_type
        }
      });
    }

    if (params.ticket_type) {
      filterOptions.push({
        name : 'tickets',
        op   : 'any',
        val  : {
          name : 'type',
          op   : 'eq',
          val  : params.ticket_type
        }
      });
    }
    if (params.is_online || params.is_location || params.is_mixed || params.location) {
      const filterArray = [];
      if (params.is_online) {
        filterArray.push(onlineFilter);
      }
      if (params.is_location) {
        filterArray.push(locationFilter);
      }
      if (params.is_mixed) {
        filterArray.push(mixedFilter);
      }
      if (filterArray.length) {
        filterOptions.push({
          or: filterArray
        });
      } else {
        filterOptions.push({
          name : 'location_name',
          op   : 'ilike',
          val  : `%${params.location}%`
        });
      }
    }
    if (params.has_image) {
      filterOptions.push({
        name : 'original-image-url',
        op   : 'ne',
        val  : null
      });
    }
    if (params.has_logo) {
      filterOptions.push({
        name : 'logo-url',
        op   : 'ne',
        val  : null
      });
    }
    if (params.name) {
      filterOptions.push({
        name : 'name',
        op   : 'ilike',
        val  : `%${params.name}%`
      });
    }

    if (params.cfs) {
      filterOptions.push({
        name : 'is_sessions_speakers_enabled',
        op   : 'eq',
        val  : params.cfs === 'open'
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
    } else if (params.start_date) {
      if (params.start_date === 'all_date') {
        filterOptions.push({
          or: [
            {
              name : 'starts-at',
              op   : 'le',
              val  : moment().toISOString()
            },
            {
              name : 'ends-at',
              op   : 'ge',
              val  : moment().toISOString()
            }
          ]
        });
      } else {
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
    } else if (params.is_past) {
      filterOptions.push({
        and: [
          {
            name : 'starts-at',
            op   : 'lt',
            val  : moment().toISOString()
          },
          {
            name : 'ends-at',
            op   : 'lt',
            val  : moment().toISOString()
          }
        ]
      });
    } else {
      filterOptions.push({
        or: [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : new Date()
          },
          {
            name : 'ends-at',
            op   : 'ge',
            val  : new Date()
          }
        ]
      });
    }

    return this.infinity.model('event', {
      include      : 'event-topic,event-sub-topic,event-type',
      filter       : filterOptions,
      sort         : params.is_past || (params.start_date === 'all_date') ? '-starts-at' : 'starts-at',
      perPage      : 6,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });

  }

  async model(params) {

    const response =  this.loader.load(`https://nominatim.openstreetmap.org/search?q=${params.location}&format=jsonv2&addressdetails=1`, { isExternal: true });
    let [cords] = await Promise.all([response]);

    if (cords.length < 1) {
      cords = [{ lat: '20', lon: '79' }];
    }

    return hash({
      eventTypes     : this.store.findAll('event-type'),
      eventTopics    : this.store.findAll('event-topic', { include: 'event-sub-topics' }),
      filteredEvents : this._loadEvents(params),
      lat            : cords[0].lat,
      lng            : cords[0].lon
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    this.set('controller', controller);
  }

  debouncedFilterChange = debounce(async params => {
    if (this.controller) {
      this.controller.set('filteredEvents', await this._loadEvents(params));
      this.controller.set('filters', params);
    }
  }, 250)

  @action
  queryParamsDidChange(change, params) {
    this.debouncedFilterChange(params);
  }

  resetController(controller, isExiting, transition) {
    super.resetController(...arguments);
    if (transition.to.name !== 'explore.groups') {
      controller.clearAllFilters();
    }
  }
}
