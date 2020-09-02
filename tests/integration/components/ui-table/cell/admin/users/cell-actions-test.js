import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/admin/users/cell actions', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('deleteUser', () => {});
    this.set('moveToUserDetails', () => {});
    this.set('openEditModal', () => {});
    await render(hbs`{{ui-table/cell/admin/users/cell-actions deleteUser=(action deleteUser) moveToUserDetails=(action moveToUserDetails) openEditModal=(action openEditModal)}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
