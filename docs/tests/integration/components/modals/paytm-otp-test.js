import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/paytm otp modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      'isOpen'    : false,
      'currency'  : 'USD',
      'amount'    : 100,
      'verifyOtp' : () => {}
    });
    await render(hbs`{{modals/paytm-otp isOpen=isOpen currency=currency amount=amount verifyOtp=(action verifyOtp)}}`);
    assert.ok(this.element.innerHTML.trim().includes('Enter OTP sent to mobile number'));
  });
});
