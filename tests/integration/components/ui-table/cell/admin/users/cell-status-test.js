import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/users/cell-status', 'Integration | Component | ui table/cell/admin/users/cell status');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/users/cell-status}}`);
  assert.ok(this.$().html().trim().includes(''));

});
