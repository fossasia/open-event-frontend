import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/view/overview/event tickets', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('model', {
      event: {
        paymentCurrency: 'USD'
      }
    });
    this.set('tickets', 10);
    this.set('orders', 10);
    this.set('sales', 100);
    await render(hbs`{{events/view/overview/event-tickets data=model tickets=tickets orders=orders sales=sales}}`);
    assert.ok(this.element.innerHTML.trim().includes('Tickets'));
  });
});

