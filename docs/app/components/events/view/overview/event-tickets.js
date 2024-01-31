import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('ui', 'fluid', 'card')
export default class EventTickets extends Component {
  @computed('data.orderStat.tickets')
  get tickets() {
    return this.data.orderStat.tickets.completed + this.data.orderStat.tickets.placed;
  }

  @computed('data.orderStat.orders')
  get orders() {
    return this.data.orderStat.orders.completed + this.data.orderStat.orders.placed;
  }

  @computed('data.orderStat.sales')
  get sales() {
    return this.data.orderStat.sales.completed + this.data.orderStat.sales.placed;
  }
}
