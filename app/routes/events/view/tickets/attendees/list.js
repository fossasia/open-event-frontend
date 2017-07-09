import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    switch (this.get('params.attendees_status')) {
      case 'placed':
        return this.l10n.t('Placed');
      case 'pending':
        return this.l10n.t('Pending');
      case 'expired':
        return this.l10n.t('Expired');
      case 'cancelled':
        return this.l10n.t('Cancelled');
      case 'checkedIn':
        return this.l10n.t('Checked In');
      case 'notCheckedIn':
        return this.l10n.t('Not Checked In');
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
        'invoiceNumber' : '#O1496523209-306',
        'amount'        : 0,
        'paidVia'       : 'Free',
        'buyerName'     : 'sample@gmail.com',
        'firstName'     : 'john',
        'lastName'      : 'Doe',
        'ticketName'    : 'A'
      },
      {
        'status'        : 'Completed',
        'completedAt'   : '2016-04-06',
        'id'            : 1,
        'invoiceNumber' : '#O1496523209-306',
        'amount'        : 0,
        'paidVia'       : 'Free',
        'buyerName'     : 'sample@gmail.com',
        'firstName'     : 'aajohn',
        'lastName'      : 'bbDoe',
        'ticketName'    : 'A'
      }
    ];
  }
});
