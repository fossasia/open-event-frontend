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

  async didInsertElement() {
    const discountCode = await this.data.discountCode;
    const tickets = await this.data.tickets;
    const ticketInput = {
      'discount-code' : discountCode?.id,
      'tickets'       : tickets.toArray().map(ticket => ({
        id       : ticket.id,
        quantity : 1,
        price    : ticket.price
      }))
    };
    const ticketAmount = await this.loader.post('/orders/calculate-amount', ticketInput);
    if (discountCode) {
      tickets.forEach(ticket => {
        const discountedTicket = ticketAmount.tickets.find(o => {
          return ticket.id === o.id.toString();
        });
        if (discountedTicket.discount) {
          ticket.set('discountedTicketTax', discountedTicket.discounted_tax);
          ticket.set('discountedTicketPrice', discountedTicket.price - discountedTicket.discount.amount);
        }
      });
    }
  }
}
