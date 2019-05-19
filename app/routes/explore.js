import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Explore');
  },

  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @return {*}
   * @private
   */
  _loadEvents(params) {
    let filterOptions = [
      {
        name : 'state',
        op   : 'eq',
        val  : 'published'
      }
    ];

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

    if (params.location) {
      filterOptions.push({
        name : 'location_name',
        op   : 'ilike',
        val  : `%${params.location}%`
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

    return this.store.query('event', {
      sort    : 'starts-at',
      filter  : filterOptions,
      include : 'event-topic,event-sub-topic,event-type'
    });
  },

  async model(params) {
    return {
      eventTypes     : await this.store.findAll('event-type'),
      eventTopics    : await this.store.findAll('event-topic', { include: 'event-sub-topics' }),
      filteredEvents : await this._loadEvents(params)
    };
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    this.set('controller', controller);
  },

  actions: {
    async queryParamsDidChange(change, params) {
      if (this.controller) {
        this.controller.set('filteredEvents', await this._loadEvents(params));
        this.controller.set('filters', params);
      }
    }
  }
});
