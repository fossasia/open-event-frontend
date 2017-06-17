import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('Notification Logs');
  },

  model() {
    return [
      {
        receivedAt : new Date(),
        action     : 'Invitation For Papers',
        title      : 'Invitation to Submit Papers for event1',
        message    : 'You have been invited to submit papers for event1',
        user       : {
          name  : 'test user',
          email : 'test@gmail.com'
        }

      },

      {
        receivedAt : new Date(),
        action     : 'New Session Proposal',
        title      : 'New session proposal for event1',
        message    : 'The event event1 has received a new session proposal.',
        user       : {
          name  : 'event user',
          email : 'event_user@gmail.com'
        }
      },

      {
        receivedAt : new Date(),
        action     : 'Ticket(s) Purchased to Organizer',
        title      : 'New ticket purchase for event2 by buyer@mail.com (O1497634451-1) ',
        message    : 'The order has been processed successfully',
        user       : {
          name  : 'event user',
          email : 'event_user@gmail.com'
        }
      }
    ];
  }
});
