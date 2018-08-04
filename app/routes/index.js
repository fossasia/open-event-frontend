import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({

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

    return this.store.query('event', {
      sort    : 'starts-at',
      include : 'event-topic,event-sub-topic,event-type,speakers-call',
      filter  : filterOptions
    });
  },

  async model(params) {
    return {
      filteredEvents: await this._loadEvents(params)
    };
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('filteredEvents', model.filteredEvents);
    this.set('controller', controller);
  },

  actions: {
    async queryParamsDidChange(change, params) {
      if (this.get('controller')) {
        this.get('controller').set('filteredEvents', await this._loadEvents(params));
      }
    }
  }
});
