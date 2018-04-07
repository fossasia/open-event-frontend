import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | scheduler/external event list', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{scheduler/external-event-list}}`);
    assert.ok(this.element.innerHTML.trim().includes('Events'));
  });
});
