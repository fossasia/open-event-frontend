import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/admin/users/cell actions', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('deleteUser', () => {});
    this.set('moveToUserDetails', () => {});
    this.render(hbs`{{ui-table/cell/admin/users/cell-actions deleteUser=(action deleteUser) moveToUserDetails=(action moveToUserDetails)}}`);
    assert.ok(find('*').textContent.trim().includes(''));
  });
});
