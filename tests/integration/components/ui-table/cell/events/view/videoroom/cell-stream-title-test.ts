import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/videoroom/cell-stream-title', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ui-table/cell/events/view/videoroom/cell-stream-title}}`);

    assert.equal(this.element.textContent?.trim(), '');
  });
});
