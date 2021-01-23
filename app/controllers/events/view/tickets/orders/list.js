import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {

  sort_by = 'created-at';

  sort_dir = 'DSC';

  get columns() {
    return [
      {
        name            : 'Order',
        valuePath       : 'identifier',
        extraValuePaths : ['user', 'status', 'paidVia', 'completedAt', 'createdAt'],
        cellComponent   : 'ui-table/cell/events/view/tickets/orders/cell-order',
        width           : 170,
        actions         : {
          completeOrder      : this.completeOrder.bind(this),
          cancelOrder        : this.cancelOrder.bind(this),
          resendConfirmation : this.resendConfirmation.bind(this)
        }
      },
      {
        name      : 'First Name',
        valuePath : 'user.firstName',
        width     : 50
      },
      {
        name      : 'Last Name',
        valuePath : 'user.lastName',
        width     : 50
      },
      {
        name            : 'Date and Time',
        valuePath       : 'completedAt',
        extraValuePaths : ['createdAt'],
        cellComponent   : 'ui-table/cell/events/view/tickets/orders/cell-date',
        headerComponent : 'tables/headers/sort',
        width           : 100,
        isSortable      : true
      },
      {
        name            : 'Total Amount',
        valuePath       : 'amount',
        extraValuePaths : ['discountCode', 'event'],
        cellComponent   : 'ui-table/cell/events/view/tickets/orders/cell-amount',
        headerComponent : 'tables/headers/sort',
        width           : 60,
        isSortable      : true
      },
      {
        name      : 'Quantity',
        valuePath : 'attendees.length',
        width     : 50
      },
      {
        name      : 'Buyer/Registration Contact',
        valuePath : 'user.email',
        width     : 100

      }
    ];
  }

  @computed('model.data.@each')
  get rows() {
    return this.model.data;
  }

  @action
  completeOrder(order_id) {
    this.set('isLoading', true);
    const order = this.store.peekRecord('order', order_id, { backgroundReload: false });
    order.set('status', 'completed');
    order.save()
      .then(() => {
        this.notify.success(this.l10n.t('Order has been marked completed successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while completing order', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  cancelOrder(order_id) {
    this.set('isLoading', true);
    const order = this.store.peekRecord('order', order_id, { backgroundReload: false });
    order.set('status', 'cancelled');
    order.save()
      .then(() => {
        this.notify.success(this.l10n.t('Order has been cancelled successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while cancelling order', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  async resendConfirmation(order_id) {
    try {
      const order = this.store.peekRecord('order', order_id, { backgroundReload: false });
      const payload = {
        'data': {
          'order' : order.identifier,
          'user'  : this.authManager.currentUser.email
        }
      };
      await this.loader.post('orders/resend-email', payload);
      this.notify.success(this.l10n.t('Email confirmation has been sent to attendees successfully'));
    } catch (error) {
      console.error('Error while sending confirmation mail to attendee');
      if (error.status && error.status === 429) {
        this.notify.error(this.l10n.t('Only 5 resend actions are allowed in a minute'));
      } else if (error.status && error.status === 422) {
        this.notify.error(this.l10n.tVar(error.response.errors[0].detail));
      } else {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      }
    }
  }
}
