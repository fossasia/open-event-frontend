import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { computed } from '@ember/object';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @computed()
  get columns() {
    let columns = [];
    if (this.model.params.invoice_status === 'upcoming') {
      columns = [
        {
          name      : 'Invoice ID',
          valuePath : 'identifier'
        },
        {
          name          : 'Event Name',
          valuePath     : 'event',
          cellComponent : 'ui-table/cell/events/cell-event-invoice'
        },
        {
          name      : 'Date Issued',
          valuePath : 'createdAt'
        },
        {
          name            : 'Outstanding Amount',
          valuePath       : 'amount',
          extraValuePaths : ['event'],
          cellComponent   : 'ui-table/cell/events/cell-amount'
        },
        {
          name      : 'View Invoice',
          valuePath : 'invoicePdfUrl'
        }
      ];
    } else if (this.model.params.invoice_status === 'paid') {
      columns = [
        {
          name      : 'Invoice ID',
          valuePath : 'identifier'
        },
        {
          name          : 'Event Name',
          valuePath     : 'event',
          cellComponent : 'ui-table/cell/events/cell-event-invoice'
        },
        {
          name      : 'Date Issued',
          valuePath : 'createdAt'
        },
        {
          name            : 'Amount',
          valuePath       : 'amount',
          extraValuePaths : ['event'],
          cellComponent   : 'ui-table/cell/events/cell-amount'
        },
        {
          name      : 'Date Paid',
          valuePath : 'completedAt'
        },
        {
          name      : 'View Invoice',
          valuePath : 'invoicePdfUrl'
        }

      ];
    } else if (this.model.params.invoice_status === 'due') {
      columns =   [
        {
          name      : 'Invoice ID',
          valuePath : 'identifier'
        },
        {
          name          : 'Event Name',
          valuePath     : 'event',
          cellComponent : 'ui-table/cell/events/cell-event-invoice'

        },
        {
          name      : 'Date Issued',
          valuePath : 'createdAt'
        },
        {
          name            : 'Amount Due',
          valuePath       : 'amount',
          extraValuePaths : ['event'],
          cellComponent   : 'ui-table/cell/events/cell-amount'
        },
        {
          name      : 'View Invoice',
          valuePath : 'invoicePdfUrl'
        }

      ];
    } else if (this.model.params.invoice_status === 'all') {
      columns = [
        {
          name      : 'Invoice ID',
          valuePath : 'identifier'
        },
        {
          name          : 'Event Name',
          valuePath     : 'event',
          cellComponent : 'ui-table/cell/events/cell-event-invoice'
        },
        {
          name            : 'Amount',
          valuePath       : 'amount',
          extraValuePaths : ['event'],
          cellComponent   : 'ui-table/cell/events/cell-amount'
        },
        {
          name      : 'Status',
          valuePath : 'status'
        }

      ];
    }
    return columns;
  }
}