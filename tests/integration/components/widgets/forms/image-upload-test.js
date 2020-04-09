import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | widgets/forms/image upload', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{widgets/forms/image-upload maxSizeInKb=10000}}`);
    assert.ok(this.element.innerHTML.trim().includes('click or drag-and-drop'));
  });
});
