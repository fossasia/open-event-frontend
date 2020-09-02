import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/paytm payment options modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      'isOpen'            : false,
      'currency'          : 'USD',
      'amount'            : 100,
      'openOTPController' : () => {}
    });
    await render(hbs`{{modals/paytm-payment-options isOpen=isOpen currency=currency amount=amount openOTPController=(action openOTPController)}}`);
    assert.ok(this.element.innerHTML.trim().includes('Select an option to pay'));
  });
});
