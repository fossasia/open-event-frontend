import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/reset-password-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      errorMessage   : null,
      successMessage : 'This is a success message'
    });
    await render(hbs`{{forms/reset-password-form errorMessage=errorMessage successMessage=successMessage}}`);

    assert.ok(this.element.innerHTML.trim().includes('This is a success message'));

  });
});
