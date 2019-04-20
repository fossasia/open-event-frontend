import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Helper | ticket-attendees', function(hooks) {
  setupIntegrationTest(hooks);
  test('it renders', async function(assert) {
    this.set('allTicketAttendees', ['user1', 'user2', 'user3', 'user4', 'user5']);
    this.set('orderAttendees', ['user1', 'user2', 'user4']);
    await render(hbs`{{ticket-attendees allTicketAttendees orderAttendees}}`);
    assert.equal(this.element.textContent.trim(), 3);
  });
});

