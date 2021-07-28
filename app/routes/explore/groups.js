import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { debounce } from 'lodash-es';
import moment from 'moment';
import { hash } from 'rsvp';

@classic
export default class GroupsRoute extends Route {
  titleToken() {
    return this.l10n.t('explore.groups');
  }

  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @return {*}
   * @private
   */

  _loadGroups(params) {
    const filterOptions = [
      {
        name : 'events',
        op   : 'any',
        val  : {
          name : 'state',
          op   : 'eq',
          val  : 'published'
        }
      },
      {
        name : 'events',
        op   : 'any',
        val  : {
          name : 'privacy',
          op   : 'eq',
          val  : 'public'
        }
      }
    ];
    const onlineFilter = {
      and: [
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'online',
            op   : 'eq',
            val  : true
          }
        },
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'location_name',
            op   : 'eq',
            val  : null
          }
        }
      ]
    };
    const locationFilter = {
      and: [
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'location_name',
            op   : params.location ? 'ilike' : 'ne',
            val  : params.location ? `%${params.location}%` : null
          }
        },
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'online',
            op   : 'eq',
            val  : false
          }
        }
      ]
    };
    const mixedFilter = {
      and: [
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'online',
            op   : 'eq',
            val  : true
          }
        },
        {
          name : 'events',
          op   : 'any',
          val  : {
            name : 'location_name',
            op   : params.location ? 'ilike' : 'ne',
            val  : params.location ? `%${params.location}%` : null
          }
        }
      ]
    };

    if (params.category) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'event-topic',
          op   : 'has',
          val  : {
            name : 'name',
            op   : 'eq',
            val  : params.category
          }
        }
      });
    }

    if (params.sub_category) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'event-sub-topic',
          op   : 'has',
          val  : {
            name : 'slug',
            op   : 'eq',
            val  : params.sub_category
          }
        }
      });
    }

    if (params.event_type) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'event-type',
          op   : 'has',
          val  : {
            name : 'name',
            op   : 'eq',
            val  : params.event_type
          }
        }
      });
    }

    if (params.ticket_type) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'tickets',
          op   : 'any',
          val  : {
            name : 'type',
            op   : 'eq',
            val  : params.ticket_type
          }
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
          name : 'events',
          op   : 'any',
          val  : {
            name : 'location_name',
            op   : 'ilike',
            val  : `%${params.location}%`
          }
        });
      }
    }
    if (params.has_image) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'original-image-url',
          op   : 'ne',
          val  : null
        }
      });
    }
    if (params.has_logo) {
      filterOptions.push({
        name : 'events',
        op   : 'any',
        val  : {
          name : 'logo-url',
          op   : 'ne',
          val  : null
        }
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
        name : 'events',
        op   : 'any',
        val  : {
          name : 'is_sessions_speakers_enabled',
          op   : 'eq',
          val  : params.cfs === 'open'
        }
      });
    }

    if (params.start_date && params.end_date) {
      filterOptions.push({
        or:
          [
            {
              and: [
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'starts-at',
                    op   : 'ge',
                    val  : params.start_date
                  }
                },
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'starts-at',
                    op   : 'le',
                    val  : params.end_date
                  }
                }
              ]
            },
            {
              and: [
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'ends-at',
                    op   : 'ge',
                    val  : params.start_date
                  }
                },
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'ends-at',
                    op   : 'le',
                    val  : params.end_date
                  }
                }
              ]
            },
            {
              and: [
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'starts-at',
                    op   : 'le',
                    val  : params.start_date
                  }
                },
                {
                  name : 'events',
                  op   : 'any',
                  val  : {
                    name : 'ends-at',
                    op   : 'ge',
                    val  : params.end_date
                  }
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
              name : 'events',
              op   : 'any',
              val  : {
                name : 'starts-at',
                op   : 'le',
                val  : moment().toISOString()
              }
            },
            {
              name : 'events',
              op   : 'any',
              val  : {
                name : 'ends-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            }
          ]
        });
      } else {
        filterOptions.push({
          or: [
            {
              name : 'events',
              op   : 'any',
              val  : {
                name : 'starts-at',
                op   : 'ge',
                val  : params.start_date
              }
            },
            {
              name : 'events',
              op   : 'any',
              val  : {
                name : 'ends-at',
                op   : 'ge',
                val  : params.start_date
              }
            }
          ]
        });
      }
    } else if (params.is_past) {
      filterOptions.push({
        and: [
          {
            name : 'events',
            op   : 'any',
            val  : {
              name : 'starts-at',
              op   : 'lt',
              val  : moment().toISOString()
            }
          },
          {
            name : 'events',
            op   : 'any',
            val  : {
              name : 'ends-at',
              op   : 'lt',
              val  : moment().toISOString()
            }
          }
        ]
      });
    } else {
      filterOptions.push({
        or: [
          {
            name : 'events',
            op   : 'any',
            val  : {
              name : 'starts-at',
              op   : 'ge',
              val  : new Date()
            }
          },
          {
            name : 'events',
            op   : 'any',
            val  : {
              name : 'ends-at',
              op   : 'ge',
              val  : new Date()
            }
          }
        ]
      });
    }

    return this.infinity.model('group', {
      include      : 'events',
      filter       : filterOptions,
      // sort         : params.is_past || (params.start_date === 'all_date') ? '-starts-at' : 'starts-at',
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
      filteredGroups : this._loadGroups(params),
      lat            : cords[0].lat,
      lng            : cords[0].lon
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('filteredGroups', model.filteredGroups);
    this.set('controller', controller);
  }

  debouncedFilterChange = debounce(async params => {
    if (this.controller) {
      this.controller.set('filteredGroups', await this._loadGroups(params));
      this.controller.set('filters', params);
    }
  }, 250)

  @action
  queryParamsDidChange(change, params) {
    this.debouncedFilterChange(params);
  }

  resetController(controller) {
    super.resetController(...arguments);
    controller.clearAllFilters();
  }
}
