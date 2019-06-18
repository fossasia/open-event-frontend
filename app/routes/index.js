import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @param mode
   * @return {*}
   * @private
   */
  _loadEvents(params, mode) {
    let filterOptions = [
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

  },

  async model(params) {
    let filterOptions =  this._loadEvents(params, 'filterOptions');
    return {
      filteredEvents: await this.store.query('event', {
        sort    : 'starts-at',
        include : 'event-topic,event-sub-topic,event-type,speakers-call',
        filter  : filterOptions
      })
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
      }
    },
    loading(transition) {
      transition.promise.finally(() => {
        this.controller.set('finishedLoading', true);
      });
      return false;
    }
  }
});
