import Controller from '@ember/controller';
export default Controller.extend({
  columns: [
    {
      propertyName   : 'state',
      title          : 'State',
      disableSorting : true,
      template       : 'components/ui-table/cell/events/view/sessions/cell-session-state'
    },
    {
      propertyName : 'title',
      title        : 'Title'
    },
    {
      propertyName   : 'speakers',
      template       : 'components/ui-table/cell/cell-speakers',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName   : 'shortAbstract',
      title          : 'Short Abstract',
      disableSorting : true
    },
    {
      propertyName : 'submitted-at',
      template     : 'components/ui-table/cell/cell-simple-date',
      title        : 'Submission Date'
    },
    {
      propertyName : 'last-modified',
      template     : 'components/ui-table/cell/cell-simple-date',
      title        : 'Last Modified'
    },
    {
      propertyName   : 'is-mail-sent',
      title          : 'Email Sent',
      template       : 'components/ui-table/cell/events/view/sessions/cell-is-mail-sent',
      disableSorting : true
    },
    {
      template         : 'components/ui-table/cell/cell-simple-buttons',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      template         : 'components/ui-table/cell/events/view/sessions/cell-buttons',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ],
  actions: {
    deleteSession(session) {
      this.set('isLoading', true);
      session.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Session has been deleted successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(()=>{
          this.set('isLoading', false);
        });
    },
    editSession(id) {
      this.transitionToRoute('public.cfs.new-session', id);
    },
    viewSession(id) {
      this.transitionToRoute('my-sessions.view', id);
    }
  }
});
