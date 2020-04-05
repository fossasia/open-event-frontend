import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/login-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      errorMessage : null,
      newUser      : false
    });
    await render(hbs`{{forms/login-form errorMessage=errorMessage newUser=newUser}}`);

    assert.ok(this.element.innerHTML.trim().includes('Forgot your password ?'));

  });
});
