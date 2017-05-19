import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['ui', 'segments'],

  total: computed('tickets.@each.orderQuantity', function() {
    var sum = 0.0;
    this.get('tickets').forEach(ticket => {
      sum += (ticket.price * ticket.orderQuantity);
    });
    return sum;
  })
});
