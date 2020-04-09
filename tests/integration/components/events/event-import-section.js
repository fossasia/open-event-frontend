import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/event import section', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{events/event-import-section}}`);
    assert.ok(this.element.innerHTML.trim().includes('Import Event'));
  });
});
