import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/view/tickets/orders/cell-actions', 'Integration | Component | ui table/cell/events/view/tickets/orders/cell actions');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/events/view/tickets/orders/cell-actions}}`);
  assert.ok(this.$().text().trim().includes(''));
});
