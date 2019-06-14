import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  totalOrders : computed('model.orderStats.orders.completed', 'model.orderStats.orders.placed', function() {
    return this.model.orderStats.orders.completed + this.model.orderStats.orders.placed;
  }),
  totalAmount : computed('model.orderStats.sales.completed', 'model.orderStats.sales.placed', function() {
    return this.model.orderStats.sales.completed + this.model.orderStats.sales.placed;
  }),
  totalOrders : computed('model.orderStats.orders.completed', 'model.orderStats.orders.placed', function() {
    return this.model.orderStats.tickets.completed + this.model.orderStats.tickets.placed;
  })
});
