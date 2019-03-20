import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName : 'code',
      title        : 'Access Code'
    },
    {
      propertyName   : 'accessUrl',
      title          : 'Access Code URL',
      template       : 'components/ui-table/cell/events/view/tickets/access-codes/cell-url',
      disableSorting : true
    },
    {
      propertyName : 'valid-till',
      title        : 'Validity',
      template     : 'components/ui-table/cell/cell-validity'
    },
    {
      propertyName : 'is-active',
      title        : 'Status',
      template     : 'components/ui-table/cell/cell-label'
    },
    {
      title            : 'Actions',
      template         : 'components/ui-table/cell/events/view/tickets/access-codes/cell-actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ],

  actions: {
    deleteAccessCode(accessCode) {
      this.set('isLoading', true);
      accessCode.destroyRecord()
        .then(() => {
          this.get('model').reload();
          this.notify.success(this.get('l10n').t('Access Code has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    toggleStatus(accessCode) {
      this.set('isLoading', true);
      accessCode.toggleProperty('isActive');
      accessCode.save()
        .then(() => {
          this.notify.success(this.get('l10n').t('Access Code has been updated successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    editAccessCode(id) {
      this.transitionToRoute('events.view.tickets.access-codes.edit', id);
    }
  }

});
