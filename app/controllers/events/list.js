import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name            : 'Name',
        valuePath       : 'name',
        width           : 150,
        isSortable      : true,
        extraValuePaths : ['identifier', 'logoUrl'],
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
        extraValuePaths : ['endsAt', 'timezone'],
        isSortable      : true,
        width           : 180,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-date'

      },
      {
        name            : 'Roles',
        valuePath       : 'owner',
        extraValuePaths : ['organizers', 'coorganizers', 'trackOrganizers', 'registrars', 'moderators'],
        width           : 180,
        cellComponent   : 'ui-table/cell/cell-roles'
      },
      {
        name          : 'Sessions',
        valuePath     : 'generalStatistics',
        cellComponent : 'ui-table/cell/cell-sessions-dashboard'
      },
      {
        name          : 'Speakers',
        valuePath     : 'generalStatistics',
        cellComponent : 'ui-table/cell/cell-speakers-dashboard'
      },
      {
        name          : 'Public URL',
        valuePath     : 'url',
        width         : 250,
        cellComponent : 'ui-table/cell/cell-link'
      }
    ];
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
      this.notify.success(this.l10n.t('Event has been deleted successfully.'),
        {
          id: 'event_del_succ'
        });
      this.send('refreshRoute');
    } catch (e) {
      console.error('Error while deleting event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'event_del_unex'
        });
    }
    this.setProperties({
      isLoading              : false,
      isEventDeleteModalOpen : false
    });
  }
}
