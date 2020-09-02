import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | ui-grid-number', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', 2);
    await render(hbs`{{ui-grid-number inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'two');
  });
});

