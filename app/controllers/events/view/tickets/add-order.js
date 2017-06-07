import Ember from 'ember';
import { sumBy } from 'lodash';

const { Controller, computed } = Ember;

export default Controller.extend({
  hasTicketsInOrder: computed('model.@each.quantity', function() {
    return sumBy(this.get('model'), 'quantity') > 0;
  }),
  total: computed('model.@each.quantity', function() {
    let sum = 0.0;
    this.get('model').forEach(order => {
      sum += (order.price * order.quantity);
    });
    return sum;
  })
});
