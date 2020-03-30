import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sumBy } from 'lodash-es';

export default Controller.extend({
  hasTicketsInOrder: computed('model.tickets.@each.orderQuantity', function() {
    return sumBy(this.model.tickets.toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),
  total: computed('model.tickets.@each.orderQuantity', function() {
    let sum = 0.0;
    this.model.tickets.forEach(ticket => {
      sum += ticket.get('orderQuantity') * ticket.get('price');
    });
    return sum;
  }),
  columns: [
    {
      propertyName : 'name',
      title        : 'Ticket Type'
    },
    {
      propertyName : 'price',
      title        : 'Price',
      template     : 'components/ui-table/cell/events/view/tickets/cell-add-order-price'
    },
    {
      propertyName : 'quantity',
      title        : 'Quantity',
      template     : 'components/ui-table/cell/events/view/tickets/cell-add-order-quantity'
    },
    {
      propertyName : 'itemTotal',
      title        : 'Item Total',
      template     : 'components/ui-table/cell/events/view/tickets/cell-add-order-total'
    }
  ],

  actions: {
    updateOrder(ticket, count) {
      let { order } = this.model;
      ticket.set('orderQuantity', count);
      order.set('amount', this.total);
      if (!this.total) {
        order.set('amount', 0);
      }
      if (count > 0) {
        order.tickets.addObject(ticket);
      } else {
        if (order.tickets.includes(ticket)) {
          order.tickets.removeObject(ticket);
        }
      }
    },
    async placeOrder() {
      this.set('isLoading', true);
      let { order } = this.model;
      let event = order.get('event');
      order.tickets.forEach(ticket => {
        let numberOfAttendees = ticket.orderQuantity;
        while (numberOfAttendees--) {
          this.model.attendees.addObject(this.store.createRecord('attendee', {
            firstname : 'John',
            lastname  : 'Doe',
            email     : 'johndoe@example.com',
            event,
            ticket
          }));
        }
      });
      try {
        let { order } = this.model;
        let { attendees } = this.model;
        await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.save()));
        order.set('attendees', attendees.slice());
        await order.save()
          .then(order => {
            this.notify.success(this.l10n.t('Order details saved. Please fill further details within 10 minutes.'));
            this.transitionToRoute('orders.new', order.identifier);
          })
          .catch(async() => {
            await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.destroyRecord()));
            this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
      }
    }
  }
});
