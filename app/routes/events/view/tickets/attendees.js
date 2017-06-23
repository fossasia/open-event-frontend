import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Attendees');
  },
  model() {
    return [
      {
        'status'         : 'Completed',
        'completed_at'   : '2016-04-06',
        'id'             : 1,
        'invoice_number' : '#O1496523209-306',
        'amount'         : 0,
        'paid_via'       : 'Free',
        'buyer_name'     : 'sample@gmail.com',
        'first_name'     : 'john',
        'last_name'      : 'Doe',
        'ticket_name'    : 'A'
      },
      {
        'status'         : 'Completed',
        'completed_at'   : '2016-04-06',
        'id'             : 1,
        'invoice_number' : '#O1496523209-306',
        'amount'         : 0,
        'paid_via'       : 'Free',
        'buyer_name'     : 'sample@gmail.com',
        'first_name'     : 'aajohn',
        'last_name'      : 'bbDoe',
        'ticket_name'    : 'A'
      }
    ];
  }
});
