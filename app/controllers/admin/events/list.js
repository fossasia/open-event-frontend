import Controller from '@ember/controller';
import { computed } from '@ember/object';
export default Controller.extend({
  hasRestorePrivileges: computed('authManager.currentUser.isAdmin', function() {
    return this.get('authManager.currentUser.isSuperAdmin') || this.get('authManager.currentUser.isAdmin');
  }),
  columns: [
    {
      propertyName : 'name',
      template     : 'components/ui-table/cell/cell-event',
      title        : 'Name'
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
      propertyName : 'state',
      template     : 'components/ui-table/cell/cell-event-state',
      title        : 'State'
    },
    {
      propertyName   : 'roles',
      template       : 'components/ui-table/cell/cell-roles',
      title          : 'Roles',
      disableSorting : true
    },
    {
      propertyName   : 'eventStatisticsGeneral.sessions',
      template       : 'components/ui-table/cell/cell-sessions',
      title          : 'Sessions',
      disableSorting : true
    },
    {
      propertyName   : 'eventStatisticsGeneral.speakers',
      template       : 'components/ui-table/cell/cell-speakers-dashboard',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName   : 'tickets',
      template       : 'components/ui-table/cell/cell-tickets',
      title          : 'Tickets',
      disableSorting : true
    },
    {
      propertyName   : 'url',
      template       : 'components/ui-table/cell/cell-link',
      title          : 'Public URL',
      disableSorting : true
    },
    {
      propertyName   : 'is-featured',
      template       : 'components/ui-table/cell/admin/event-is-featured',
      title          : 'Featured Event',
      disableSorting : false
    },
    {
      propertyName   : 'deletedAt',
      template       : 'components/ui-table/cell/cell-buttons',
      title          : 'Actions',
      disableSorting : true
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
      this.store.findRecord('event', this.eventId, { backgroundReload: false }).then(function(event) {
        event.destroyRecord();
      })
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('Event has been deleted successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
      this.set('isEventDeleteModalOpen', false);
    },
    restoreEvent(event) {
      this.set('isLoading', true);
      event.set('deletedAt', null);
      event.save({ adapterOptions: { getTrashed: true } })
        .then(() => {
          this.notify.success(this.l10n.t('Event has been restored successfully.'));
          this.send('refreshRoute');
        })
        .catch(e => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
          console.warn(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    toggleFeatured(event) {
      event.toggleProperty('isFeatured');
      event.save()
        .then(() => {
          this.notify.success(this.l10n.t('Event details modified successfully'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
    }
  }
});
