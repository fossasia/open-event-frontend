import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/events/view/tickets/attendees/cell price', function(hooks) {
  setupIntegrationTest(hooks);
  const extraRecords = {
    event: {
      paymentCurrency: 'USD'
    }
  };
  test('it renders', async function(assert) {
    this.set('extraRecords', extraRecords);
    await render(hbs`{{ui-table/cell/events/view/tickets/attendees/cell-price extraRecords=extraRecords}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
