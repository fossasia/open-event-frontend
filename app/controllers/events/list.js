import Controller from '@ember/controller';
import { computed, action } from '@ember/object';

export default class extends Controller {
  queryParams = ['page', 'per_page'];
  page = 1;
  per_page    = 1;

  @computed()
  get columns() {
    return [
      {
        name            : 'Name',
        valuePath       : 'name',
        extraValuePaths : ['startsAt', 'endAt'],
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
    ];
  }

  @computed('model.data')
  get rows() {
    const rows = [];
    this.model.data.forEach(row => {
      rows.pushObject({
        name     : row,
        startsAt : row.startsAt,
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
  doAction(eventName) {
    // Also testing the availability of correct `this` context
    alert(`Works on page ${this.page}. Got event name: ${eventName}`);
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
    this.set('isEventDeleteModalOpen', true);
    this.set('confirmName', '');
    this.set('eventName', name);
    this.set('eventId', id);
  }

  @action
  async deleteEvent() {
    this.set('isLoading', true);

    try {
      const event = await this.store.findRecord('event', this.eventId, { backgroundReload: false });
      event.destroyRecord();
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
