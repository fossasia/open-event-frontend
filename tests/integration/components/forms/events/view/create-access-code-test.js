import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/events/view/create access code', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{forms/events/view/create-access-code routing=routing router=router}}`);
    assert.ok(this.element.innerHTML.trim().includes('Save'));
  });
});
