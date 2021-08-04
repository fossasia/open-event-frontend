import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  get columns() {
    return [
      {
        name      : 'Discount code',
        width     : 100,
        valuePath : 'code'
      },
      {
        name          : 'Discount code URL',
        valuePath     : 'discountUrl',
        width         : 220,
        cellComponent : 'ui-table/cell/events/view/tickets/discount-codes/cell-url'
      },
      {
        name            : 'Discount Per Ticket',
        valuePath       : 'value',
        width           : 90,
        extraValuePaths : ['type', 'event'],
        cellComponent   : 'ui-table/cell/events/view/tickets/discount-codes/cell-value'
      },
      {
        name          : 'Validity',
        valuePath     : 'validTill',
        width         : 120,
        cellComponent : 'ui-table/cell/events/view/tickets/discount-codes/cell-validity'
      },
      {
        name            : 'Status',
        valuePath       : 'isActive',
        width           : 100,
        extraValuePaths : ['isExpired'],
        cellComponent   : 'ui-table/cell/events/view/tickets/discount-codes/cell-status'
      },
      {
        name            : 'Actions',
        valuePath       : 'id',
        width           : 170,
        extraValuePaths : ['isActive', 'isExpired'],
        cellComponent   : 'ui-table/cell/events/view/tickets/discount-codes/cell-actions',
        actions         : {
          deleteDiscountCode : this.deleteDiscountCode.bind(this),
          toggleStatus       : this.toggleStatus.bind(this),
          editDiscountCode   : this.editDiscountCode.bind(this)
        }
      }
    ];
  }


  @action
  deleteDiscountCode(discount_id) {
    this.set('isLoading', true);
    const discountCode = this.store.peekRecord('discountCode', discount_id, { backgroundReload: false });
    discountCode.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Discount Code has been deleted successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while deleting discount code', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  toggleStatus(discount_id) {
    this.set('isLoading', true);
    const discountCode = this.store.peekRecord('discountCode', discount_id, { backgroundReload: false });
    discountCode.toggleProperty('isActive');
    discountCode.save()
      .then(() => {
        this.notify.success(this.l10n.t('Discount Code has been updated successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while updating discount code', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  editDiscountCode(id) {
    this.transitionToRoute('events.view.tickets.discount-codes.edit', id);
  }
}
