import Ember from 'ember';
import { sumBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ui', 'segments', 'ticket-list'],

  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets'), 'orderQuantity') > 0;
  }),

  total: computed('tickets.@each.orderQuantity', function() {
    let sum = 0.0;
    this.get('tickets').forEach(ticket => {
      sum += (ticket.price * ticket.orderQuantity);
    });
    return sum;
  })
});
