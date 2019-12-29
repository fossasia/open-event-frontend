import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    switch (this.get('params.orders_status')) {
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
    this.set('params', params);
    const searchField = 'identifier';
    let filterOptions = [];
    if (params.orders_status !== 'all') {
      filterOptions = [
        {
          name : 'status',
          op   : 'eq',
          val  : params.orders_status
        }
      ];
    }

    filterOptions = this.applySearchFilters(filterOptions, params, searchField);

    let queryString = {
      include        : 'tickets,user',
      filter         : filterOptions,
      'page[size]'   : params.per_page || 10,
      'page[number]' : params.page || 1
    };

    queryString = this.applySortFilters(queryString, params);

    return  this.asArray(this.modelFor('events.view').query('orders', queryString));
  }
}
