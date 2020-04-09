import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | css', function(hooks) {
  setupIntegrationTest(hooks);
  test('it renders', async function(assert) {
    await render(hbs`{{css background-color='#ffffff' color='#000000'}}`);
    assert.equal(this.element.textContent.trim(), 'background-color: #ffffff;color: #000000;');
  });
});

