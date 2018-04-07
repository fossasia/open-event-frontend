import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    switch (this.get('params.orders_status')) {
      case 'placed':
        return this.get('l10n').t('Placed');
      case 'pending':
        return this.get('l10n').t('Pending');
      case 'expired':
        return this.get('l10n').t('Expired');
      case 'cancelled':
        return this.get('l10n').t('Cancelled');
      case 'all':
        return this.get('l10n').t('All');
    }
  },

  model(params) {
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
    return this.modelFor('events.view').query('orders', {
      include      : 'tickets,user',
      filter       : filterOptions,
      'page[size]' : 10
    });
  }
});
