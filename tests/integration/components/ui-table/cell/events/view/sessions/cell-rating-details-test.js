import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/sessions/cell-rating-details', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ui-table/cell/events/view/sessions/cell-rating-details}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
