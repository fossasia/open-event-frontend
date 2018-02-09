import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/sales/status/cell-dated', 'Integration | Component | ui table/cell/admin/sales/status/cell dated');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/sales/status/cell-dated}}`);
  assert.ok(this.$().text().trim().includes(''));

});
