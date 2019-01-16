import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash';

export default Component.extend(FormMixin, {
  tickets: computed('data.tickets', function() {
    return this.get('data.tickets').sortBy('position');
  }),

  total: computed('data.tickets', 'data.tickets.@each.attendees', function() {
    return sumBy(this.get('data.tickets').toArray(),
      ticket => (ticket.getWithDefault('price', 0) - ticket.getWithDefault('discount', 0)) * ticket.getWithDefault('attendees.length', 0)
    );
  }),

  async didInsertElement() {
    let discountCode = await this.get('data.discountCode');
    let tickets = await this.get('data.tickets');
    tickets.forEach(ticket => {
      ticket.set('discount', 0);
    });
    if (discountCode) {
      let discountType = discountCode.get('type');
      let discountValue = discountCode.get('value');
      tickets.forEach(ticket => {
        let ticketPrice = ticket.get('price');
        if (discountType === 'amount') {
          ticket.set('discount', Math.min(ticketPrice, discountValue));
        } else {
          ticket.set('discount', ticketPrice * (discountValue / 100));
        }
      });
    }
  }
});
