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
      title          : 'Price(US$)',
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
        order.set('amount', null);
      }
      if (count > 0) {
        order.tickets.addObject(ticket);
      } else {
        if (order.tickets.includes(ticket)) {
          order.tickets.removeObject(ticket);
        }
      }
    }
  }
});
