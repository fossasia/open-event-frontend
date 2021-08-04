import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @service errorHandler;

  get columns() {
    return [
      {
        name            : this.l10n.t('Invoice #'),
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        valuePath       : 'identifier',
        extraValuePaths : ['invoicePdfUrl'],
        cellComponent   : 'ui-table/cell/events/cell-download-invoice'
      },
      {
        name            : this.l10n.t('Event'),
        valuePath       : 'event.name',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name            : this.l10n.t('Invoice Date'),
        valuePath       : 'issuedAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-date',
        options         : {
          timezone   : 'UTC',
          dateFormat : 'D MMM, YYYY'
        }
      },
      {
        name          : this.l10n.t('Due Date'),
        valuePath     : 'dueAt',
        cellComponent : 'ui-table/cell/cell-date',
        options       : {
          timezone   : 'UTC',
          dateFormat : 'D MMM, YYYY'
        }
      },
      {
        name            : this.l10n.t('Amount'),
        valuePath       : 'amount',
        extraValuePaths : ['event'],
        cellComponent   : 'ui-table/cell/events/cell-amount',
        isSortable      : true,
        headerComponent : 'tables/headers/sort'
      },
      {
        name          : this.l10n.t('Sent To'),
        valuePath     : 'user',
        cellComponent : 'ui-table/cell/admin/sales/invoice-user'
      },
      {
        name            : this.l10n.t('Status'),
        valuePath       : 'status',
        extraValuePaths : ['id'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/admin/sales/cell-status-action',
        options         : {
          paymentStateMap: [{ 'name': 'paid', 'color': 'green' }, { 'name': 'due', 'color': 'red' }, { 'name': 'refunding', 'color': 'orange' }, { 'name': 'refunded', 'color': 'violet' }, { 'name': 'failed', 'color': 'black' }, { 'name': 'resolved', 'color': 'green' }]
        },
        actions: {
          changeState: this.changeState.bind(this)
        }
      },
      {
        name            : this.l10n.t('Action'),
        valuePath       : 'identifier',
        extraValuePaths : ['status'],
        cellComponent   : 'ui-table/cell/events/cell-action'
      }
    ];
  }

  @action
  async changeState(invoice_id, status) {
    const invoice =  this.store.peekRecord('eventInvoice', invoice_id, { backgroundReload: false });
    const oldState = invoice.status;
    invoice.set('status', status);
    this.set('isLoading', true);

    try {
      await invoice.save();
      this.notify.success(this.l10n.t('Invoice state has been changed to {{action}} successfully.', {
        action: status
      }), {
        id: 'invoice_state'
      });
    } catch (e) {
      invoice.set('status', oldState);
      this.errorHandler.handle(e);
    } finally {
      this.set('isLoading', false);
    }
  }


}
