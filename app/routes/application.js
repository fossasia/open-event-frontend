import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, RSVP } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('config.appName'));
    return tokens.join(' | ');
  },
  model() {
    return RSVP.hash({
      notifications: [
        {
          title       : 'New Session Proposal for event1 by  user1',
          description : 'Title of proposal',
          createdAt   : new Date(),
          isRead      : false
        },
        {
          title       : 'New Session Proposal for event2 by  user2',
          description : 'Title of proposal',
          createdAt   : new Date(),
          isRead      : true
        },
        {
          title       : 'New Session Proposal for event3 by  user3',
          description : 'Title of proposal',
          createdAt   : new Date(),
          isRead      : false
        },
        {
          title       : 'New Session Proposal for event4 by  user4',
          description : 'Title of proposal',
          createdAt   : new Date(),
          isRead      : true
        },
        {
          title       : 'New Session Proposal for event5 by  user5',
          description : 'Title of proposal',
          createdAt   : new Date(),
          isRead      : false
        }
      ]
    });
  },
  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  }
});
