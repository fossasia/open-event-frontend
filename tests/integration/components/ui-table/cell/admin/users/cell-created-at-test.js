import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/users/cell-created-at', 'Integration | Component | ui table/cell/admin/users/cell created at');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/users/cell-created-at}}`);
  assert.ok(this.$().html().trim().includes(''));
});
