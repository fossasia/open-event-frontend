import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName   : 'user',
      template       : 'components/ui-table/cell/events/view/tickets/orders/cell-order',
      title          : 'Order',
      disableSorting : true
    },
    {
      propertyName : 'completedAt',
      template     : 'components/ui-table/cell/events/view/tickets/orders/cell-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A',
      title        : 'Date And Time'
    },
    {
      propertyName : 'amount',
      template     : 'components/ui-table/cell/events/view/tickets/orders/cell-amount',
      title        : 'Total Amount'
    },
    {
      propertyName : 'tickets.length',
      title        : 'Quantity'
    },
    {
      propertyName   : 'user.email',
      title          : 'Buyer/Registration Contact',
      disableSorting : true
    }
  ],

  actions: {
    completeOrder(order) {
      this.set('isLoading', true);
      order.set('status', 'completed');
      order.save()
        .then(() => {
          this.send('refreshRoute');
          this.notify.success(this.l10n.t('Order has been marked completed successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    deleteOrder(order) {
      this.set('isLoading', true);
      order.destroyRecord()
        .then(() => {
          this.send('refreshRoute');
          this.notify.success(this.l10n.t('Order has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    cancelOrder(order) {
      this.set('isLoading', true);
      order.set('status', 'cancelled');
      order.save()
        .then(() => {
          this.send('refreshRoute');
          this.notify.success(this.l10n.t('Order has been cancelled successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
