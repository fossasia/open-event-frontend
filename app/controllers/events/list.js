import Controller from '@ember/controller';
import { computed, action } from '@ember/object';

export default class extends Controller {
  queryParams = ['page', 'per_page'];
  page = 1;
  per_page = 10;
  search = null;
  sort_dir = null;
  sort_by = null;
  sorts = [];
  @computed()
  get columns() {
    return [
      {
        name            : 'Name',
        valuePath       : 'name',
        isSortable      : true,
        extraValuePaths : ['startsAt', 'endAt'],
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-general',
        options         : {
          dateFormat: 'MMMM DD, YYYY - HH:mm A'
        },
        actions: {
          moveToPublic  : this.moveToPublic.bind(this),
          moveToDetails : this.moveToDetails.bind(this),
          editEvent     : this.editEvent.bind(this)
        }
      },
      {
        name            : 'Date',
        valuePath       : 'startsAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-date'

      },
      {
        name          : 'Roles',
        valuePath     : 'roles',
        cellComponent : 'ui-table/cell/cell-roles',
        isSortable    : false
      },
      {
        name          : 'Sessions',
        valuePath     : 'sessions',
        isSortable    : false,
        cellComponent : 'ui-table/cell/cell-sessions-dashboard'
      },
      {
        name          : 'Speakers',
        valuePath     : 'speakers',
        cellComponent : 'ui-table/cell/cell-speakers-dashboard',
        isSortable    : false

      },
      {
        name          : 'Tickets',
        valuePath     : 'tickets',
        cellComponent : 'ui-table/cell/cell-tickets',
        isSortable    : false

      },
      {
        name          : 'Public URL',
        valuePath     : 'url',
        cellComponent : 'ui-table/cell/cell-link',
        isSortable    : false
      }
    ];
  }

  @computed('model.data')
  get rows() {
    const rows = [];
    this.model.data.forEach(row => {
      rows.pushObject({
        name     : row,
        startsAt : row,
        roles    : row,
        sessions : row,
        speakers : row,
        tickets  : row,
        url      : row
      });
    });
    return rows;
  }

  @action
  moveToPublic(id) {
    this.transitionToRoute('public', id);
  }

  @action
  moveToDetails(id) {
    this.transitionToRoute('events.view', id);
  }

  @action
  editEvent(id) {
    this.transitionToRoute('events.view.edit.basic-details', id);
  }

  @action
  openDeleteEventModal(id, name) {
    this.setProperties({
      isEventDeleteModalOpen : true,
      confirmName            : '',
      eventName              : name,
      eventId                : id
    });
  }

  @action
  async deleteEvent() {
    this.set('isLoading', true);

    try {
      const event = this.store.peekRecord('event', this.eventId, { backgroundReload: false });
      await event.destroyRecord();
      this.notify.success(this.l10n.t('Event has been deleted successfully.'));
      this.send('refreshRoute');
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.setProperties({
      isLoading              : false,
      isEventDeleteModalOpen : false
    });
  }
}
