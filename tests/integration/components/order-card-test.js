import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | order card', function(hooks) {
  setupIntegrationTest(hooks);

  const event = EmberObject.create({ originalImageUrl: 'abc.png', name: 'Pragma', startsAt: new Date(), shortLocationName: 'IN', paymentCurrency: 'INR' });
  const order = EmberObject.create({ identifier: 123, amount: 1000, event, completedAt: new Date() });

  test('it renders', async function(assert) {
    this.set('order', order);
    await render(hbs`{{order-card order=order}}`);
    assert.ok(this.element.innerHTML.trim().includes('Pragma'));
  });
});
