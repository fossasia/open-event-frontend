import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/admin/settings/payment gateway form', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', function(assert) {
    this.set('settings', settings);
    this.render(hbs`{{forms/admin/settings/payment-gateway-form settings=settings}}`);
    assert.ok(find('*').innerHTML.trim().includes('Stripe'));
  });
});
