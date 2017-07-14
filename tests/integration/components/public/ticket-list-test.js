import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, A } = Ember;

moduleForComponent('public/ticket-list', 'Integration | Component | public/ticket list');

const tickets =  A(
  [
    EmberObject.create({
      description   : 'Community ticket',
      price         : 2.50,
      name          : 'Community Ticket',
      type          : 'paid',
      id            : 1,
      quantity      : 10,
      orderQuantity : 0,
      minOrder      : 0,
      maxOrder      : 5
    }),
    EmberObject.create({
      description   : 'Standard ticket',
      price         : 3.05,
      name          : 'Standard Ticket',
      type          : 'paid',
      id            : 2,
      quantity      : 10,
      orderQuantity : 0,
      minOrder      : 0,
      maxOrder      : 5
    }),
    EmberObject.create({
      description   : 'Super ticket',
      price         : 5.00,
      name          : 'Super Ticket',
      type          : 'paid',
      id            : 3,
      quantity      : 10,
      orderQuantity : 0,
      minOrder      : 0,
      maxOrder      : 5
    })
  ]
);
test('it renders', function(assert) {

  this.set('tickets', tickets);
  this.render(hbs `{{public/ticket-list tickets=tickets}}`);

  assert.ok(this.$().html().trim().includes('Standard Ticket'));
});
