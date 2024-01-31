import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

module('Integration | Helper | can-modify-order', function(hooks) {
  setupIntegrationTest(hooks);

  test('it returns true for free orders', async function(assert) {
    const order = EmberObject.create({
      amount         : 0,
      status         : 'completed',
      discountCodeId : null
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it returns true for paid non completed orders', async function(assert) {
    const order = EmberObject.create({
      amount         : 10,
      status         : 'placed',
      discountCodeId : null
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('it returns false for paid completed orders', async function(assert) {
    const order = EmberObject.create({
      amount         : 10,
      status         : 'completed',
      discountCodeId : null
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('it returns false for paid, completed discounted orders', async function(assert) {
    const order = EmberObject.create({
      amount         : 0,
      status         : 'completed',
      discountCodeId : 1
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('it returns true for paid, non completed discounted orders', async function(assert) {
    const order = EmberObject.create({
      amount         : 10,
      status         : 'pending',
      discountCodeId : 1
    });
    this.set('order', order);

    await render(hbs`{{can-modify-order order}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });
});

