import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

module('Integration | Helper | can-modify-order', function(hooks) {
  setupIntegrationTest(hooks);

  test('it returns true for free orders', async function(assert) {
    let order = EmberObject.create({
      amount : 0,
      status : 'completed'
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it returns true for paid non completed orders', async function(assert) {
    let order = EmberObject.create({
      amount : 10,
      status : 'placed'
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it returns false for paid completed orders', async function(assert) {
    let order = EmberObject.create({
      amount : 10,
      status : 'completed'
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });

});

