import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | order-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let event = EmberObject.create({
      id         : 123,
      identifier : 'abc123'
    });

    let order = EmberObject.create({
      amount : 20,
      status : 'completed',
      event
    });

    this.set('order', order);
    await render(hbs`{{order-card order=order}}`);

    assert.ok(this.element.innerHTML.trim().includes('20'));
  });
});
