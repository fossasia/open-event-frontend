import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/edit-user-modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    await render(hbs`{{modals/edit-user-modal isOpen=isOpen}}`);
    assert.ok(this.element.innerHTML.trim().includes('Update System Roles'));
  });
});
