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
    },
    {
      title          : 'Actions',
      template       : 'components/ui-table/cell/events/view/tickets/orders/cell-actions',
      disableSorting : true
    }
  ],

  actions: {
    deleteOrder(order) {
      this.set('isLoading', true);
      order.destroyRecord()
        .then(() => {
          this.get('model').reload();
          this.notify.success(this.get('l10n').t('Order has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
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
          this.notify.success(this.get('l10n').t('Order has been cancelled successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
