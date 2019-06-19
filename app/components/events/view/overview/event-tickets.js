import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['ui', 'fluid', 'card'],

  tickets: computed('data.orderStat.tickets', function() {
    return this.data.orderStat.tickets.completed + this.data.orderStat.tickets.placed;
  }),
  orders: computed('data.orderStat.orders', function() {
    return this.data.orderStat.orders.completed + this.data.orderStat.orders.placed;
  }),
  sales: computed('data.orderStat.sales', function() {
    return this.data.orderStat.sales.completed + this.data.orderStat.sales.placed;
  })
});
