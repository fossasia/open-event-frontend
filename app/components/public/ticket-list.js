import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { sumBy } from 'lodash';

export default Component.extend(FormMixin, {
  tickets: computed(function() {
    return this.get('data').sortBy('position');
  }),
  hasTicketsInOrder: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),

  total: computed('tickets.@each.orderQuantity', function() {
    return sumBy(this.get('tickets').toArray(),
      ticket => ticket.getWithDefault('price', 0) * ticket.getWithDefault('orderQuantity', 0)
    );
  }),
  actions: {
    togglePromotionalCode() {
      this.toggleProperty('enterPromotionalCode');
    },
    applyPromotionalCode() {
      this.onValid(() => {
      });
    },
    updateOrder(ticket, count) {
      let order = this.get('order');
      ticket.set('orderQuantity', count);
      order.set('amount', this.get('total'));
      if (!this.get('total')) {
        order.set('amount', null);
      }
      if (count > 0) {
        order.tickets.addObject(ticket);
      } else {
        if (order.tickets.includes(ticket)) {
          order.tickets.removeObject(ticket);
        }
      }
    },
    placeOrder() {
      let order = this.get('order');
      let event = order.get('event');
      order.tickets.forEach(ticket => {
        let numberOfAttendees = ticket.orderQuantity;
        while (numberOfAttendees--) {
          this.get('attendees').addObject(this.store.createRecord('attendee', {
            firstname : 'John',
            lastname  : 'Doe',
            email     : 'johndoe@example.com',
            event,
            ticket
          }));
        }
      });
      this.sendAction('save');
    }
  },
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        promotionalCode: {
          identifier : 'promotional_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the promotional Code')
            }
          ]
        }
      }
    };
  }
});
