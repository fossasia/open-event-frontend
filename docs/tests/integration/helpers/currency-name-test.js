import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | currency-name', function(hooks) {
  setupIntegrationTest(hooks);
  test('it renders', async function(assert) {
    this.set('inputValue', 'USD');

    await render(hbs`{{currency-name inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'United States dollar');
  });
});

