import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';

moduleForComponent('ui-table/cell/events/view/tickets/discount-codes/cell-value', 'Integration | Component | ui table/cell/events/view/tickets/discount codes/cell value');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/events/view/tickets/discount-codes/cell-value}}`);
  assert.ok(this.$().text().trim().includes(''));

});
