import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/orders/order-form', 'Integration | Component | forms/orders/order-form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/orders/order-form}}`);
  assert.ok(this.$().text().trim(), 'order-form');
});
