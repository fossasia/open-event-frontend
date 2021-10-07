import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash-es';

@classic
export default class OrderSummary extends Component.extend(FormMixin) {
  @computed('data.tickets')
  get tickets() {
    return this.data.tickets.sortBy('position');
  }

  @computed('data.tickets', 'data.tickets.@each.attendees')
  get total() {
    return sumBy(this.data.tickets.toArray(),
      ticket => (ticket.get('price') ?? 0 - ticket.get('discount') ?? 0) * ticket.get('attendees.length') ?? 0
    );
  }

  @computed('data.tickets', 'data.tickets.@each.attendees', 'data.discountCode')
  get orderAmountInput() {
    const { discountCode } = this.data;
    const input = {
      'discount-code' : discountCode.get('id'),
      'tickets'       : this.data.tickets.toArray().map(ticket => ({
        id       : ticket.id,
        quantity : ticket.get('attendees.length'),
        price    : ticket.price
      }))
    };
    return input;
  }

  async didInsertElement() {
    const discountCode = await this.data.discountCode;
    const tickets = await this.data.tickets;
    // const ticketInput = {
    //   'discount-code' : discountCode?.id,
    //   'tickets'       : tickets.toArray().map(ticket => ({
    //     id       : ticket.id,
    //     quantity : 1,
    //     price    : ticket.price
    //   }))
    // };
    const ticketInput = this.orderAmountInput;
    const ticketAmount = await this.loader.post('/orders/calculate-amount', ticketInput);
    this.set('total', ticketAmount.sub_total);
    this.set('grandTotal', ticketAmount.total);
    if (discountCode) {
      tickets.forEach(ticket => {
        const mappedTicket = ticketAmount.tickets.find(o => {
          return ticket.id === o.id.toString();
        });
        ticket.set('subTotal', mappedTicket.sub_total);
        if (mappedTicket.discount) {
          ticket.set('discountedTicketTax', mappedTicket.discounted_tax);
          ticket.set('discountedTicketPrice', mappedTicket.price - mappedTicket.discount.amount);
        }
      });
    }
  }
}
