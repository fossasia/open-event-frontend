import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ui', 'segments', 'ticket-list'],

  total: computed('tickets.@each.orderQuantity', function() {
    let sum = 0.0;
    this.get('tickets').forEach(ticket => {
      sum += (ticket.price * ticket.orderQuantity);
    });
    return sum;
  })
});
