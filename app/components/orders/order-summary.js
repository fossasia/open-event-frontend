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
    tickets.forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (discountCode) {
      const discountCodeTickets = await discountCode.get('tickets');
      const discountType = discountCode.get('type');
      const discountValue = discountCode.get('value');
      tickets.forEach(ticket => {
        if (discountCodeTickets.includes(ticket)) {
          const ticketPrice = ticket.get('price');
          if (discountType === 'amount') {
            ticket.set('discount', Math.min(ticketPrice, discountValue));
          } else {
            ticket.set('discount', ticketPrice * (discountValue / 100));
          }
        }
      });
    }
  }
}
