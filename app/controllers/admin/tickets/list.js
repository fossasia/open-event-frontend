import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @computed()
  get columns() {
    return [
      {
        name            : 'Order',
        valuePath       : 'order',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-order',
        width           : 250,
        actions         : {
          deleteOrder  : this.deleteOrder.bind(this),
          restoreOrder : this.restoreOrder.bind(this)
        }
      },
      {
        name            : 'Date and Time',
        valuePath       : 'createdAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/tickets/orders/cell-date'
      },
      {
        name            : 'Total Amount',
        valuePath       : 'amount',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-amount'
      },
      {
        name            : 'Buyer/ Registeration Contact',
        valuePath       : 'user',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-user-email'
      },
      {
        name            : 'Event Name',
        valuePath       : 'event',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-event-info'
      }
    ]
  }

  @computed('model.data.[]', 'model.data.@each.user')
  get rows() {
    const rows = [];
    this.model.data.map(row => {
      console.log('order :', row.deletedAt);
      rows.pushObject({
        order     : row,
        createdAt : row,
        amount    : row,
        user      : row.get('user'),
        event     : row.get('event'),
        actions   : row
      });
    });
    return rows;
  }

  @action
  async deleteOrder(order) {
    try {
      await order.destroyRecord();
      this.notify.success(this.l10n.t('Order has been deleted successfully.'));
    }
    catch {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
  }

  @action
  async restoreOrder(order) {
    try {
      order.set('deletedAt', null);
      await order.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('Order has been restored successfully.'));
    } catch {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
  }
}