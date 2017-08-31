import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/users/cell-actions', 'Integration | Component | ui table/cell/admin/users/cell actions');

test('it renders', function(assert) {
  this.set('deleteUser', () => {});
  this.set('moveToUserDetails', () => {});
  this.render(hbs`{{ui-table/cell/admin/users/cell-actions deleteUser=(action deleteUser) moveToUserDetails=(action moveToUserDetails)}}`);
  assert.ok(this.$().text().trim().includes(''));
});
