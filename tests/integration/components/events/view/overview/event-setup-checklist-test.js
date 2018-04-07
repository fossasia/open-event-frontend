import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/overview/event setup checklist', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{events/view/overview/event-setup-checklist}}`);
    assert.ok(this.element.innerHTML.trim().includes('Event setup checklist'));
  });
});
