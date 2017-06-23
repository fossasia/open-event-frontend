import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Orders');
  },

  model() {
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
