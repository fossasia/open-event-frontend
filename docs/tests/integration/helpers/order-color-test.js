import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | order-color', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('orderState', 'completed');
    await render(hbs`{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'green');

    this.set('orderState', 'placed');
    await render(hbs`{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'blue');

    this.set('orderState', 'initializing');
    await render(hbs`{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'yellow');

    this.set('orderState', 'pending');
    await render(hbs `{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'orange');

    this.set('orderState', 'expired');
    await render(hbs `{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'red');

    this.set('orderState', undefined);
    await render(hbs `{{order-color orderState}}`);
    assert.equal(this.element.textContent.trim(), 'grey');
  });
});
