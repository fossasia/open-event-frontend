import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/admin/settings/system/social-media-token', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{forms/admin/settings/system/social-media-token}}`);

    assert.ok(this.element.innerHTML.trim().includes('Google Tokens'));

  });
});
