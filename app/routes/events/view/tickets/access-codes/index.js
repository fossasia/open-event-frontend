import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/tickets/access-codes/list',
  model() {
    return [
      {
        'accessCode'       : '#386',
        'accessCodeUrl'    : 'https://github.com',
        'accessibleTicket' : 'Early bird',
        'validity'         : '3 months',
        'isActive'         : true
      }, {
        'accessCode'       : '#386',
        'accessCodeUrl'    : 'https://github.com',
        'accessibleTicket' : 'Early bird',
        'validity'         : '3 months',
        'isActive'         : false
      }
    ];
  }
});
