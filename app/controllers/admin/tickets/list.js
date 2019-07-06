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
        cellComponent   : 'ui-table/cell/admin/tickets/cell-order'
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
        valuePath       : 'user.email',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-user-email'
      },
      {
        name            : 'Event Name',
        valuePath       : 'event',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-event-info'
      },
      {
        name            : 'Actions',
        valuePath       : 'actions',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-action'
      }
    ]
  }

  @computed('model.data')
  get rows() {
    const rows = [];
    this.model.data.forEach(row => {
      console.log('SOMETHING AWESOME ', row);
      rows.pushObject({
        order     : row,
        createdAt : row,
        amount    : row,
        startsAt  : row
      });
    });
    return rows;
  }
}