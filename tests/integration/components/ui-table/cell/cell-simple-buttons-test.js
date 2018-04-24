import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell simple buttons', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('deleteSession', () => {});
    this.set('editSession', () => {});
    this.set('viewSession', () => {});
    await render(hbs`{{ui-table/cell/cell-simple-buttons deleteSession=(action deleteSession) editSession=(action editSession) viewSession=(action viewSession)}}`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
