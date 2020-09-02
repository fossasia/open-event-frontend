import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | currency-symbol', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', 'USD');

    await render(hbs`{{currency-symbol inputValue}}`);

    assert.equal(this.element.textContent.trim(), '$');
  });
});

