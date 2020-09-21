import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name            : 'Invoice #',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'identifier'
      },
      {
        name      : 'Event',
        valuePath : 'event.name'
      },
      {
        name            : 'Invoice Date',
        valuePath       : 'createdAt',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        cellComponent   : 'ui-table/cell/cell-simple-date',
        options         : {
          dateFormat: 'MMMM DD, YYYY - HH:mm A'
        }
      },
      {
        name          : 'Amount',
        valuePath     : 'amount',
        cellComponent : 'ui-table/cell/admin/sales/status/cell-amount'
      },
      {
        name      : 'Sent To',
        valuePath : 'user.email'
      },
      {
        name      : 'Status',
        valuePath : 'status'
      }
      // {
      //  name            : 'Action',
      //  valuePath       : 'identifier',
      //  cellComponent   : 'ui-table/cell/admin/sales/cell-action'
      // }
    ];
  }
}
