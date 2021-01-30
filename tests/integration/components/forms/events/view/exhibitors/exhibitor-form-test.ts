import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/events/view/exhibitors/exhibitor-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{forms/events/view/exhibitors/exhibitor-form}}`);

    assert.equal(this.element.textContent?.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#forms/events/view/exhibitors/exhibitor-form}}
        template block text
      {{/forms/events/view/exhibitors/exhibitor-form}}
    `);

    assert.equal(this.element.textContent?.trim(), 'template block text');
  });
});
