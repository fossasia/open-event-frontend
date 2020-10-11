import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { sumBy } from 'lodash-es';

@classic
export default class AddOrderController extends Controller {
  @computed('model.tickets.@each.orderQuantity')
  get hasTicketsInOrder() {
    return sumBy(this.model.tickets.toArray(),
      ticket => ticket.get('orderQuantity') ?? 0
    ) > 0;
  }

  @computed('model.tickets.@each.orderQuantity')
  get total() {
    let sum = 0.0;
    this.model.tickets.forEach(ticket => {
      sum += ticket.get('orderQuantity') * ticket.get('price');
    });
    return sum;
  }

  columns = [
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
  ];

  @action
  updateOrder(ticket, count) {
    const { order } = this.model;
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
  async placeOrder(orderInput) {
    if (orderInput) {
      this.set('orderInput', orderInput);
    }
    if (!this.session.isAuthenticated) {
      this.set('userExists', false);
      this.set('isLoginModalOpen', true);
      return;
    }
    this.send('save');
  }

  @action
  async save() {
    try {
      this.set('isLoading', true);
      const { orderInput } = this;
      try {
        const order = await this.loader.post('/orders/create-order', orderInput);
        this.notify.success(this.l10n.t(`Order details saved. Please fill further details within ${this.settings.orderExpiryTime} minutes.`));
        this.transitionToRoute('orders.new', order.data.attributes.identifier);
      } catch (e) {
        if (e.response?.errors[0]?.source?.code === 'unverified-user') {
          console.warn('Unverified user placing order', e.response);
        } else {
          console.error('Error while saving order', e);
        }
        this.notify.error(this.l10n.t(e.response.errors[0].detail));
      } finally {
        this.set('isLoading', false);
      }
    } catch (e) {
      console.error('Error while creating order', e);
      this.notify.error(this.l10n.t(e));
    }
  }
}
