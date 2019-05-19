import Controller from '@ember/controller';
export default Controller.extend({
  columns: [
    {
      propertyName : 'code',
      title        : 'Discount code'
    },
    {
      propertyName   : 'discount-url',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-url',
      title          : 'Discount code URL',
      disableSorting : true
    },
    {
      propertyName : 'value',
      template     : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-value',
      title        : 'Discount Per Ticket'
    },
    {
      propertyName : 'valid-till',
      template     : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-validity',
      title        : 'Validity'
    },
    {
      propertyName   : 'is-active',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-status',
      title          : 'Status',
      disableSorting : true
    },
    {
      title          : 'Actions',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-actions',
      disableSorting : true
    }
  ],

  actions: {
    deleteDiscountCode(discountCode) {
      this.set('isLoading', true);
      discountCode.destroyRecord()
        .then(() => {
          this.model.reload();
          this.notify.success(this.l10n.t('Discount Code has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    toggleStatus(discountCode) {
      this.set('isLoading', true);
      discountCode.toggleProperty('isActive');
      discountCode.save()
        .then(() => {
          this.notify.success(this.l10n.t('Discount Code has been updated successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          discountCode.toggleProperty('isActive');
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    editDiscountCode(id) {
      this.transitionToRoute('events.view.tickets.discount-codes.edit', id);
    }
  }

});
