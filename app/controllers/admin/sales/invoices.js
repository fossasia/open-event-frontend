import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name            : 'Invoice #',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'identifier',
        extraValuePaths : ['invoicePdfUrl'],
        cellComponent   : 'ui-table/cell/events/cell-download-invoice'
      },
      {
        name            : 'Event',
        valuePath       : 'event.name',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : 'Invoice Date',
        valuePath       : 'issuedAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-date',
        options         : {
          timezone   : 'UTC',
          dateFormat : 'MMMM DD, YYYY'
        }
      },
      {
        name          : 'Due Date',
        valuePath     : 'dueAt',
        cellComponent : 'ui-table/cell/cell-date',
        options       : {
          timezone   : 'UTC',
          dateFormat : 'MMMM DD, YYYY'
        }
      },
      {
        name            : 'Amount',
        valuePath       : 'amount',
        extraValuePaths : ['event'],
        cellComponent   : 'ui-table/cell/events/cell-amount',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : 'Sent To',
        valuePath     : 'user',
        cellComponent : 'ui-table/cell/admin/sales/invoice-user'
      },
      {
        name            : 'Status',
        valuePath       : 'status',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : 'Action',
        valuePath       : 'identifier',
        extraValuePaths : ['status'],
        cellComponent   : 'ui-table/cell/events/cell-action'
      }
    ];
  }
}
