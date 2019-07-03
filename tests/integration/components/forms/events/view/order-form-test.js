import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

module('Integration | Component | forms/events/view/order-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let event = EmberObject.create({
      id         : 123,
      identifier : 'abc123'
    });

    let customForms = A();
    customForms.pushObject({
      fieldIdentifier : 'twitter',
      form            : 'speaker',
      type            : 'text',
      isRequired      : false,
      isIncluded      : true,
      event
    });

    let data = EmberObject.create({
      event, customForms
    });

    this.set('data', data);

    await render(hbs`{{forms/events/view/order-form data=data}}`);

    assert.ok(this.element.innerHTML.trim().includes('Registration'));
  });
});
