import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  totalCompletedTickets: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.ticket_count;
    });
    return sum;
  }),
  totalCompletedSales: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.sales_total;
    });
    return sum;
  }),
  totalPlacedTickets: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.placed.ticket_count;
    });
    return sum;
  }),
  totalPlacedSales: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.placed.sales_total;
    });
    return sum;
  }),
  totalPendingTickets: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.pending.ticket_count;
    });
    return sum;
  }),
  totalPendingSales: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.pending.sales_total;
    });
    return sum;
  })
});
