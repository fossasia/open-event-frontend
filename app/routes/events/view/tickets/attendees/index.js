import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/tickets/attendees/list',

  model() {
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
