import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams : ['currentPage', 'pageSize'],
  currentPage : 1,
  pageSize    : 1,
  // columns: [
  //   {
  //     propertyName : 'name',
  //     template     : 'components/ui-table/cell/cell-event-general',
  //     title        : 'Name'
  //   },
  //   {
  //     propertyName : 'starts-at',
  //     template     : 'components/ui-table/cell/cell-event-date',
  //     dateFormat   : 'MMMM DD, YYYY - HH:mm A',
  //     title        : 'Date'
  //   },
  //   {
  //     propertyName     : 'roles',
  //     template         : 'components/ui-table/cell/cell-roles',
  //     title            : 'Roles',
  //     disableSorting   : true,
  //     disableFiltering : true
  //   },
  //   {
  //     propertyName     : 'sessionsByState',
  //     template         : 'components/ui-table/cell/cell-sessions-dashboard',
  //     title            : 'Sessions',
  //     disableSorting   : true,
  //     disableFiltering : true
  //   },
  //   {
  //     propertyName     : 'speakers.length',
  //     template         : 'components/ui-table/cell/cell-speakers-dashboard',
  //     title            : 'Speakers',
  //     disableSorting   : true,
  //     disableFiltering : true
  //   },
  //   {
  //     propertyName     : 'tickets',
  //     template         : 'components/ui-table/cell/cell-tickets',
  //     title            : 'Tickets',
  //     disableSorting   : true,
  //     disableFiltering : true
  //   },
  //   {
  //     propertyName     : 'url',
  //     template         : 'components/ui-table/cell/cell-link',
  //     title            : 'Public URL',
  //     disableSorting   : true,
  //     disableFiltering : true
  //   }
  // ],
  columns     : [
    {
      name      : 'Name',
      valuePath : 'name'
      // cellComponent : 'ui-table/cell/cell-event-general',
      // dateFormat    : 'MMMM DD, YYYY - HH:mm A'

    },
    {
      name          : 'Date',
      valuePath     : 'startsAt',
      cellComponent : 'ui-table/cell/cell-event-date'

    },
    {
      name          : 'Roles',
      valuePath     : 'roles',
      cellComponent : 'ui-table/cell/cell-roles'
    },
    {
      name          : 'Sessions',
      valuePath     : 'sessions',
      cellComponent : 'ui-table/cell/cell-sessions-dashboard'
    },
    {
      name          : 'Speakers',
      valuePath     : 'speakers',
      cellComponent : 'ui-table/cell/cell-speakers-dashboard'

    },
    {
      name          : 'Tickets',
      valuePath     : 'tickets',
      cellComponent : 'ui-table/cell/cell-tickets'

    },
    {
      name          : 'Public URL',
      valuePath     : 'url',
      cellComponent : 'ui-table/cell/cell-link'

    }
  ],

  rows: computed('model.data', function() {
    const rows = [];
    this.model.data.forEach(row => {
      rows.pushObject({
        name     : row.name,
        startsAt : row.startsAt,
        roles    : row,
        sessions : row,
        speakers : row,
        tickets  : row,
        url      : row
      });
    });
    return rows;
  }),
  actions: {
    moveToPublic(id) {
      this.transitionToRoute('public', id);
    },
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
          this.notify.success(this.l10n.t('Event has been deleted successfully.'));
          this.send('refreshRoute');
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
      this.set('isEventDeleteModalOpen', false);
    }
  }
});
