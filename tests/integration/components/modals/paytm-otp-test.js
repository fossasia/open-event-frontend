import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/paytm otp modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    this.set('currency', 'USD');
    this.set('amount', 100);
    await render(hbs`{{modals/paytm-otp isOpen=isOpen currency=currency amount=amount}}`);
    assert.ok(this.element.innerHTML.trim().includes('Enter OTP sent to mobile number'));
  });
});
