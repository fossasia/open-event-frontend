import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-dropdown', 'Integration | Component | notification dropdown');

const unreadNotifications = [
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
  },
  {
    title       : 'New Ticket Purchase for event6 by  user6',
    description : 'Ticket ID #1234',
    createdAt   : new Date(),
    isRead      : false
  },
  {
    title       : 'New Session Proposal for event7 by  user7',
    description : 'Title of proposal',
    createdAt   : new Date(),
    isRead      : true
  },
  {
    title       : 'New Session Proposal for event8 by  user8',
    description : 'Title of proposal',
    createdAt   : new Date(),
    isRead      : false
  }
];

test('it renders', function(assert) {
  this.set('unreadNotifications', unreadNotifications);
  this.render(hbs`{{notification-dropdown unreadNotifications=unreadNotifications l10n=l10n}}`);
  assert.ok(this.$().text().trim().includes('New Session Proposal for event1 by  user1'));
});
