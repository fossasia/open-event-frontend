import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/view/tickets/orders/cell-amount', 'Integration | Component | ui table/cell/events/view/tickets/orders/cell amount');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/events/view/tickets/orders/cell-amount}}`);
  assert.ok(this.$().text().trim().includes(''));
});
