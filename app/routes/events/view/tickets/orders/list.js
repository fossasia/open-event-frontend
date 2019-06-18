import Route from '@ember/routing/route';

export default Route.extend({
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
  },

  async model(params) {
    this.set('params', params);
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

    let queryObject = {
      include      : 'tickets,user',
      filter       : filterOptions,
      'page[size]' : 10
    };

    let store = this.modelFor('events.view');

    let data = await store.query('orders', queryObject);

    return {
      data,
      store,
      query      : queryObject,
      objectType : 'orders'
    };
  },
  actions: {
    refreshRoute() {
      this.refresh();
    }
  }
});
