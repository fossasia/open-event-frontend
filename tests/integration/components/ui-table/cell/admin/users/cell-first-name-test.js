import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/users/cell-first-name', 'Integration | Component | ui table/cell/admin/users/cell first name');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/admin/users/cell-first-name}}`);
  assert.ok(this.$().html().trim().includes(''));
});
