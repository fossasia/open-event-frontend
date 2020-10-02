import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name            : 'Invoice ID',
        valuePath       : 'identifier',
        extraValuePaths : ['invoicePdfUrl'],
        cellComponent   : 'ui-table/cell/events/cell-download-invoice'
      },
      {
        name      : 'Event Name',
        valuePath : 'event.name'
      },
      {
        name          : 'Invoice Date',
        valuePath     : 'issuedAt',
        isSortable    : true,
        cellComponent : 'ui-table/cell/cell-date',
        options       : {
          timezone   : 'UTC',
          dateFormat : 'MMMM DD, YYYY'
        }
      },
      {
        name          : 'Due Date',
        valuePath     : 'dueAt',
        isSortable    : true,
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
