import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Object: EmberObject, A } = Ember;

moduleForComponent('forms/admin/settings/ticket-fees-form', 'Integration | Component | forms/admin/settings/ticket fees form');

const model = A(
  [
    EmberObject.create({
      currency   : 'INR',
      serviceFee : 12,
      maximumFee : 22
    }),
    EmberObject.create({
      currency   : 'USD',
      serviceFee : 25,
      maximumFee : 5
    }),
    EmberObject.create({
      currency   : 'EUR',
      serviceFee : 20,
      maximumFee : 12
    })
  ]
);

test('it renders', function(assert) {
  this.set('model', model);
  this.on('updateSettings', function() {});
  this.render(hbs`{{forms/admin/settings/ticket-fees-form model=model save=(action 'updateSettings')}}`);
  assert.ok(this.$().html().trim().includes('currencies'));
});
