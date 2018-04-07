import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | public/side menu', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{public/side-menu}}`);
    assert.ok(this.element.innerHTML.trim().includes('ui fluid vertical pointing menu'));
    assert.ok(this.element.innerHTML.trim().includes('Getting here'));
  });
});
