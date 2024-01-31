import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class RevenueController extends Controller {
  @computed
  get ticketsTotal() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.ticketCount;
    });
    return sum;
  }

  @computed
  get revenueTotal() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.revenue;
    });
    return sum;
  }
}
