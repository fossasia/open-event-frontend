import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/user-profile-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{forms/user-profile-form isLoading=isLoading}}`);

    assert.ok(this.element.innerHTML.trim().includes('Update Changes'));

  });
});
