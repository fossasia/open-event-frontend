import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { sumBy } from 'lodash-es';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @computed('model.tickets.@each.orderQuantity')
  get hasTicketsInOrder() {
    return sumBy(this.get('model.tickets').toArray(),
      ticket => ticket.getWithDefault('orderQuantity', 0)
    ) > 0;
  }


  @computed('model.tickets.@each.orderQuantity')
  get total() {
    let sum = 0.0;
    this.get('model.tickets').forEach(ticket => {
      sum += ticket.get('orderQuantity') * ticket.get('price');
    });
    return sum;
  }

  @computed()
  get columns() {
    return [
      {
        name      : 'Ticket Type',
        valuePath : 'name'
      },
      {
        name            : 'Price',
        valuePath       : 'price',
        extraValuePaths : ['event'],
        cellComponent   : 'ui-table/cell/events/view/tickets/cell-add-order-price'
      },
      {
        name            : 'Quantity',
        valuePath       : 'quantity',
        extraValuePaths : ['maxOrder', 'minOrder', 'orderQuantity', 'id'],
        cellComponent   : 'ui-table/cell/events/view/tickets/cell-add-order-quantity',
        actions         : {
          updateOrder: this.updateOrder.bind(this)
        }
      },
      {
        name            : 'Item Total',
        valuePath       : 'orderQuantity',
        extraValuePaths : ['price', 'event'],
        cellComponent   : 'ui-table/cell/events/view/tickets/cell-add-order-total'
      }

    ];
  }

  @action
  updateOrder(ticket, count) {
    let order = this.get('model.order');
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
  }

    @action
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
          this.notify.success(this.l10n.t('Order details saved. Please fill further details within 10 minutes.'));
          this.transitionToRoute('orders.new', order.identifier);
        })
        .catch(async() => {
          for (const attendee of attendees ? attendees.toArray() : []) {
            await attendee.destroyRecord();
          }

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

