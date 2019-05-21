import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/view/overview/event tickets', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('model', {
      event: {
        paymentCurrency: 'USD'
      }
    });
    await render(hbs`{{events/view/overview/event-tickets data=model}}`);
    assert.ok(this.element.innerHTML.trim().includes('Tickets'));
  });
});

