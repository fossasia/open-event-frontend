import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  ticketsTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.ticketCount;
    });
    return sum;
  }),

  revenueTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.revenue;
    });
    return sum;
  })
});
