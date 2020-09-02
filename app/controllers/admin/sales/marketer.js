import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class MarketerController extends Controller {
  @computed
  get salesTotal() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.ticket_count;
    });
    return sum;
  }

  @computed
  get discountsTotal() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.sales_total;
    });
    return sum;
  }
}
