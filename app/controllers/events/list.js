import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName : 'name',
      template     : 'components/ui-table/cell/cell-event',
      title        : 'Name'
    },
    {
      propertyName : 'startsAt',
      template     : 'components/ui-table/cell/cell-event-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A',
      title        : 'Date'
    },
    {
      propertyName     : 'roles',
      template         : 'components/ui-table/cell/cell-roles',
      title            : 'Roles',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'sessionsByState',
      template         : 'components/ui-table/cell/cell-sessions-dashboard',
      title            : 'Sessions',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'speakers.length',
      template         : 'components/ui-table/cell/cell-speakers-dashboard',
      title            : 'Speakers',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'tickets',
      template         : 'components/ui-table/cell/cell-tickets',
      title            : 'Tickets',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'url',
      template         : 'components/ui-table/cell/cell-link',
      title            : 'Public URL',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      template         : 'components/ui-table/cell/cell-buttons',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ],
  actions: {
    moveToDetails(id) {
      this.transitionToRoute('events.view', id);
    },
    editEvent(id) {
      this.transitionToRoute('events.view.edit.basic-details', id);
    },
    openDeleteEventModal(id, name) {
      this.set('isEventDeleteModalOpen', true);
      this.set('confirmName', '');
      this.set('eventName', name);
      this.set('eventId', id);
    },
    deleteEvent() {
      this.set('isLoading', true);
      this.store.findRecord('event', this.get('eventId'), { backgroundReload: false }).then(function(event) {
        event.destroyRecord();
      })
        .then(() => {
          this.notify.success(this.get('l10n').t('Event has been deleted successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
      this.set('isEventDeleteModalOpen', false);
    }
  }
});
