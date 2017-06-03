import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  total: computed('model.@each.quantity', function() {
    let sum = 0.0;
    this.get('model').forEach(order => {
      sum += (order.price * order.quantity);
    });
    return sum;
  })
});
