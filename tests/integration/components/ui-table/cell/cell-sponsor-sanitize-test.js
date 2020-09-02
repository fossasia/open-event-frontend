import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui-table/cell/cell-sponsor-sanitize', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ui-table/cell/cell-sponsor-sanitize}}`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
