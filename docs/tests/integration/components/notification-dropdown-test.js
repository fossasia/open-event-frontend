/*
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | notification dropdown', function(hooks) {
  setupIntegrationTest(hooks);

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

  test('it renders', async function(assert) {
    this.set('unreadNotifications', unreadNotifications);
    await render(hbs`{{notification-dropdown unreadNotifications=unreadNotifications l10n=l10n}}`);
    assert.dom(this.element).includesText('New Session Proposal for event1 by  user1');
  });
});
*/
