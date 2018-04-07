import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | widgets/safe image', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{widgets/safe-image}}`);
    assert.ok(this.element.innerHTML.trim().includes('img'));
  });
});
