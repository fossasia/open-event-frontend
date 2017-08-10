import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/sales/status/cell-amount', 'Integration | Component | ui table/cell/admin/sales/status/cell amount');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/sales/status/cell-amount}}`);
  assert.ok(this.$().text().trim().includes(''));

});
