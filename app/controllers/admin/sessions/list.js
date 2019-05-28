import Controller from '@ember/controller';
export default Controller.extend({
  columns: [
    {
      propertyName   : 'event.name',
      title          : 'Event Name',
      disableSorting : true
    },
    {
      propertyName : 'title',
      title        : 'Title'
    },
    {
      propertyName   : 'status',
      template       : 'components/ui-table/cell/events/view/sessions/cell-session-state',
      title          : 'State',
      disableSorting : true
    },
    {
      propertyName   : 'speakers',
      template       : 'components/ui-table/cell/cell-speakers',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName : 'submittedAt',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - hh:mm A',
      title        : 'Submitted At'
    },
    {
      propertyName : 'startsAt',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - hh:mm A',
      title        : 'Starts At'
    },
    {
      propertyName : 'endsAt',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - hh:mm A',
      title        : 'Ends At'
    },
    {
      template         : 'components/ui-table/cell/cell-simple-buttons',
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
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    editSession(session_id, event_id) {
      this.transitionToRoute('events.view.sessions.edit', event_id, session_id);
    },
    viewSession(id) {
      this.transitionToRoute('my-sessions.view', id);
    }
  }
});
