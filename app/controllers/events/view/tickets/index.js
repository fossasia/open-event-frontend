import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @computed('model.orderStats.orders.completed', 'model.orderStats.orders.placed')
  get totalOrders() {
    return this.model.orderStats.orders.completed + this.model.orderStats.orders.placed;
  }

  @computed('model.orderStats.sales.completed', 'model.orderStats.sales.placed')
  get totalAmount() {
    return (this.model.orderStats.sales.completed + this.model.orderStats.sales.placed);
  }

  @computed('model.orderStats.orders.completed', 'model.orderStats.orders.placed')
  get totalSales() {
    return this.model.orderStats.tickets.completed + this.model.orderStats.tickets.placed;
  }
}
