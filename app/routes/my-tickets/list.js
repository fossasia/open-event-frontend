import Route from '@ember/routing/route';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  titleToken() {
    switch (this.get('params.ticket_status')) {
      case 'upcoming':
        return this.get('l10n').t('Upcoming');
      case 'past':
        return this.get('l10n').t('Past');
    }
  },
  /**
   * Load filtered events based on the given params
   *
   * @param params
   * @return {*}
   * @private
   */
  _loadOrders(params) {
    this.set('params', params);
    let filterOptions = [];
    if (params.ticket_status === 'upcoming') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            },
            {
              or: [
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'completed'
                },
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'placed'
                }
              ]
            },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        }
      );
    } else if (params.ticket_status === 'past') {
      filterOptions.push(
        {
          and: [
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'starts-at',
                op   : 'lt',
                val  : moment().toISOString()
              }
            },
            {
              or: [
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'completed'
                },
                {
                  name : 'status',
                  op   : 'eq',
                  val  : 'placed'
                }
              ]
            },
            {
              name : 'event',
              op   : 'has',
              val  : {
                name : 'deleted-at',
                op   : 'eq',
                val  : null
              }
            }
          ]
        });
    }

    return this.infinity.model('order', {
      include      : 'event',
      filter       : filterOptions,
      perPage      : 6,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]'
    });
  },

  async model(params) {
    return {
      filteredOrders: await this._loadOrders(params)
    };
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('filteredOrders', model.filteredOrders);
    this.set('controller', controller);
  },

  actions: {
    async queryParamsDidChange(change, params) {
      if (this.get('controller')) {
        this.get('controller').set('filteredOrders', await this._loadOrders(params));
      }
    }
  }
});
