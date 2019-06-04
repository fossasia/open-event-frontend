import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  salesTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.ticket_count;
    });
    return sum;
  }),
  discountsTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.sales_total;
    });
    return sum;
  })
});
