import Ember from 'ember';

const { Route } = Ember;

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

  model(params) {
    this.set('params', params);
    return [
      {
        'status'        : 'Completed',
        'completedAt'   : '2016-04-06',
        'id'            : 1,
        'quantity'      : 2,
        'invoiceNumber' : '#O1496523209-306',
        'amount'        : 0,
        'paidVia'       : 'Free',
        'buyer'         : 'sample@gmail.com',
        'buyerName'     : 'Sample Buyer'
      },

      {
        'status'        : 'Completed',
        'completedAt'   : '2017-06-02T11:22:33+05:30',
        'id'            : 2,
        'quantity'      : 1,
        'invoiceNumber' : '#O1345883292-302',
        'amount'        : 50,
        'paidVia'       : 'Paypal',
        'buyer'         : 'sample@gmail.com',
        'buyerName'     : 'Sample Buyer2'
      }
    ];
  }
});
