import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | tables/utilities/search-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{tables/utilities/search-box}}`);
    assert.ok(this.element.innerHTML.trim().includes('Search'));
  });
});
