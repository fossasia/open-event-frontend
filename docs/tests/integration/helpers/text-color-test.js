import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Helper | text-color', function(hooks) {
  setupIntegrationTest(hooks);


  test('it renders', async function(assert) {
    await render(hbs`{{text-color '#000000'}}`);
    assert.equal(this.element.textContent.trim(), '#fff');
    await render(hbs`{{text-color '#FFFFFF'}}`);
    assert.equal(this.element.textContent.trim(), '#000');
  });
});

