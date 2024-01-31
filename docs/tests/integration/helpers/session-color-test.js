import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | session-color', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputState', 'confirmed');
    await render(hbs`{{session-color inputState}}`);
    assert.equal(this.element.textContent.trim(), 'green');

    this.set('inputState', 'accepted');
    await render(hbs`{{session-color inputState}}`);
    assert.equal(this.element.textContent.trim(), 'teal');

    this.set('inputState', 'pending');
    await render(hbs`{{session-color inputState}}`);
    assert.equal(this.element.textContent.trim(), 'yellow');

    this.set('inputState', 'rejected');
    await render(hbs `{{session-color inputState}}`);
    assert.equal(this.element.textContent.trim(), 'red');
  });
});
