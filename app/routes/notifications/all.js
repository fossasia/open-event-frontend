import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.i18n.t('All');
  },
  model() {
    return [{
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
    }];
  }
});
