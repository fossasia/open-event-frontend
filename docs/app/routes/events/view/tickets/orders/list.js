import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import moment from 'moment-timezone';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.params.orders_status) {
      case 'placed':
        return this.l10n.t('Placed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'expired':
        return this.l10n.t('Expired');
      case 'cancelled':
        return this.l10n.t('Cancelled');
      case 'all':
        return this.l10n.t('All');
    }
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');
    this.set('params', params);
    const filterOptions = [];
    if (params.filter) {
      if (params.filter === 'discount') {
        filterOptions.pushObject({
          name : 'discount_code_id',
          op   : 'isnot',
          val  : null
        });
      } else if (params.filter === 'date' && params.start_date && params.end_date) {
        filterOptions.push({
          and: [
            {
              name : 'created-at',
              op   : 'ge',
              val  : moment.tz(params.start_date, eventDetails.timezone).toISOString()
            },
            {
              name : 'created-at',
              op   : 'le',
              val  : moment.tz(params.end_date, eventDetails.timezone).add(1, 'days').toISOString()
            }
          ]
        });
      }
    }
    if (params.search) {
      filterOptions.pushObject({
        name : 'user',
        op   : 'has',
        val  : {
          name : 'email',
          op   : 'ilike',
          val  : `%${params.search}%`
        }
      });
    }
    if (params.orders_status !== 'all') {
      filterOptions.pushObject({
        name : 'status',
        op   : 'eq',
        val  : params.orders_status
      });
    }

    let queryString = {
      include        : 'tickets,user,attendees',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);

    return  this.asArray(eventDetails.query('orders', queryString));
  }
}
