import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/admin/content/pages form', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{forms/admin/content/pages-form}}`);
    assert.ok(this.element.innerHTML.trim().includes('Name'));
  });
});
