import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/admin/content/new event type modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    await render(hbs`{{modals/admin/content/new-event-type-modal isOpen=isOpen}}`);
    assert.ok(this.element.innerHTML.trim().includes('Add New Event Type'));
  });
});
