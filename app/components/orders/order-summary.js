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
      ticket => (ticket.getWithDefault('price', 0) - ticket.getWithDefault('discount', 0)) * ticket.getWithDefault('attendees.length', 0)
    );
  }

  async didInsertElement() {
    let discountCode = await this.data.discountCode;
    let tickets = await this.data.tickets;
    tickets.forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (discountCode) {
      let discountCodeTickets = await discountCode.get('tickets');
      let discountType = discountCode.get('type');
      let discountValue = discountCode.get('value');
      tickets.forEach(ticket => {
        if (discountCodeTickets.includes(ticket)) {
          let ticketPrice = ticket.get('price');
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
