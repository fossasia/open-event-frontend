import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/admin/settings/ticket fees form', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  const model = A(
    [
      EmberObject.create({
        currency   : 'INR',
        serviceFee : 12,
        maximumFee : 22
      }),
      EmberObject.create({
        currency   : 'USD',
        serviceFee : 25,
        maximumFee : 5
      }),
      EmberObject.create({
        currency   : 'EUR',
        serviceFee : 20,
        maximumFee : 12
      })
    ]
  );

  test('it renders', async function(assert) {
    this.set('model', model);
    this.actions.updateSettings = function() {};
    await render(hbs`{{forms/admin/settings/ticket-fees-form model=model save=(action 'updateSettings')}}`);
    assert.ok(this.element.innerHTML.trim().includes('currencies'));
  });
});
