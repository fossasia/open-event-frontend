import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/ticket-list', 'Integration | Component | public/ticket list');

const tickets = [{ description: 'Community ticket', date: 'Mon, May 22', price: 2.50, name: 'Community Ticket', type: 'paid', id: 1, quantity: 10, orderQuantity: 0, min: 0, max: 5 },
  { description: 'Standard ticket', date: 'Mon, May 22', price: 3.05, name: 'Standard Ticket', type: 'paid', id: 2, quantity: 10, orderQuantity: 0, min: 0, max: 5 },
  { description: 'Super ticket', date: 'Mon, May 22', price: 5.00, name: 'Super Ticket', type: 'paid', id: 3, quantity: 10, orderQuantity: 0, min: 0, max: 5 }
];

test('it renders', function(assert) {

  this.set('tickets', tickets);
  this.render(hbs `{{public/ticket-list tickets=tickets}}`);

  assert.ok(this.$().html().trim().includes('Standard Ticket'));
});
