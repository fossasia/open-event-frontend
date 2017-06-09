import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/payment-gateway-form', 'Integration | Component | forms/admin/settings/payment gateway form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/settings/payment-gateway-form}}`);
  assert.ok(this.$().html().trim().includes('Stripe'));
});
