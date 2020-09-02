import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | url-encode', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', 'hello world');
    await render(hbs`{{url-encode inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'hello%20world');
  });
});

