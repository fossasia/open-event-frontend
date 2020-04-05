import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/view/export/api response', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{events/view/export/api-response l10n=l10n eventId=modelId}}`);
    assert.ok(this.element.innerHTML.trim().includes('Access event information'));
  });
});
