import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sumBy } from 'lodash';

export default Controller.extend({
  hasTicketsInOrder: computed('model.tickets.@each.orderQuantity', function() {
    return sumBy(this.get('model.tickets').toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }),
  total: computed('model.tickets.@each.orderQuantity', function() {
    let sum = 0.0;
    this.get('model.tickets').forEach(ticket => {
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
      propertyName   : 'price',
      title          : 'Price',
      template       : 'components/ui-table/cell/events/view/tickets/cell-add-order-price',
      disableSorting : true
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
      let order = this.get('model.order');
      ticket.set('orderQuantity', count);
      order.set('amount', this.get('total'));
      if (!this.get('total')) {
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
      let order = this.get('model.order');
      let event = order.get('event');
      order.tickets.forEach(ticket => {
        let numberOfAttendees = ticket.orderQuantity;
        while (numberOfAttendees--) {
          this.get('model.attendees').addObject(this.store.createRecord('attendee', {
            firstname : 'John',
            lastname  : 'Doe',
            email     : 'johndoe@example.com',
            event,
            ticket
          }));
        }
      });
      try {
        let order = this.get('model.order');
        let attendees = this.get('model.attendees');
        for (const attendee of attendees ? attendees.toArray() : []) {
          await attendee.save();
        }
        order.set('attendees', attendees.slice());
        await order.save()
          .then(order => {
            this.get('notify').success(this.get('l10n').t('Order details saved. Please fill further details within 10 minutes.'));
            this.transitionToRoute('orders.new', order.identifier);
          })
          .catch(async() => {
            for (const attendee of attendees ? attendees.toArray() : []) {
              await attendee.destroyRecord();
            }
            this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
      }
    }
  }
});
