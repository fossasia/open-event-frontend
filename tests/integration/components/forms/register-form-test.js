import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/register-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      errorMessage    : null,
      showSignupPass  : false,
      showConfirmPass : false
    });
    await render(hbs`{{forms/register-form errorMessage=errorMessage showSignupPass=showSignupPass showConfirmPass=showConfirmPass}}`);

    assert.ok(this.element.innerHTML.trim().includes('Already have an account? Login'));

  });
});
