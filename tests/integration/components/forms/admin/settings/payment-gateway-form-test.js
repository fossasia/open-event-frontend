import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/admin/settings/payment gateway form', function(hooks) {
  setupIntegrationTest(hooks);

  const settings = EmberObject.create({
    stripeClientId         : 'ca_8x1ebxrl8eOwOSqRTVLUJkWtcfP92YJE',
    stripeSecretKey        : 'sk_test_SQPTVKtS8YvItGQuvHFvwve4',
    stripePublishableKey   : 'pk_test_SQPTVKtS8YvItGQuvHFvwve4',
    paypalMode             : 'live',
    paypalSandboxUsername  : 'donate-facilitator_api1.fossasia.org',
    paypalSandboxPassword  : '123456',
    paypalSandboxSignature : 'signature-sandbox',
    paypalLiveUsername     : 'donate-facilitator_api1.fossasia.org',
    paypalLivePassword     : '123456',
    paypalLiveSignature    : 'signature-sandbox'
  });

  test('it renders', async function(assert) {
    this.set('settings', settings);
    await render(hbs`{{forms/admin/settings/payment-gateway-form settings=settings}}`);
    assert.ok(this.element.innerHTML.trim().includes('Stripe'));
  });
});
