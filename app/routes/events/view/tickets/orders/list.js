import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.orderss_status')) {
      case 'completed':
        return this.l10n.t('Completed');
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

  model(params) {
    this.set('params', params);
    return [
      {
        'status'         : 'Completed',
        'completed_at'   : '2016-04-06',
        'id'             : 1,
        'quantity'       : 2,
        'invoice_number' : '#O1496523209-306',
        'amount'         : 0,
        'paid_via'       : 'Free',
        'buyer'          : 'sample@gmail.com',
        'buyer_name'     : 'Sample Buyer'
      },

      {
        'status'         : 'Completed',
        'completed_at'   : '2017-06-02T11:22:33+05:30',
        'id'             : 2,
        'quantity'       : 1,
        'invoice_number' : '#O1345883292-302',
        'amount'         : 50,
        'paid_via'       : 'Paypal',
        'buyer'          : 'sample@gmail.com',
        'buyer_name'     : 'Sample Buyer2'
      }
    ];
  }
});
