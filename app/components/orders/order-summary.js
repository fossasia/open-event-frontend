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
      ticket => ((ticket.get('price') ?? 0 - ticket.get('discount') ?? 0)) * ticket.get('attendees.length') ?? 0
    );
  }

  @computed('data.tickets', 'data.tickets.@each.attendees', 'data.discountCode')
  get orderAmountInput() {
    const discountCodeId = this.data.discountCodeId || undefined;
    const input = {
      'discount-code' : discountCodeId,
      'tickets'       : this.data.tickets.toArray().map(ticket => ({
        id       : ticket.id,
        quantity : ticket.get('attendees.length'),
        price    : ticket.price
      }))
    };
    return input;
  }

  async didInsertElement() {
    try {
      const tickets = await this.data.tickets;
      const ticketInput = this.orderAmountInput;
      const ticketAmount = await this.loader.post('/orders/calculate-amount', ticketInput);
      this.set('total', ticketAmount.sub_total);
      this.set('grandTotal', ticketAmount.total);
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
    } catch (e) {
      console.error('Error while setting order amount', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'orde_sum_err'
        });
    }
  }
}
