import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { or } from '@ember/object/computed';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

  get columns() {
    return [
      {
        name            : this.l10n.t('Name'),
        valuePath       : 'name',
        extraValuePaths : ['logoUrl', 'identifier', 'deletedAt'],
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event',
        width           : 160,
        options         : {
          hasRestorePrivileges: this.hasRestorePrivileges
        },
        actions: {
          openDeleteEventModal : this.openDeleteEventModal.bind(this),
          deleteEvent          : this.deleteEvent.bind(this),
          restoreEvent         : this.restoreEvent.bind(this)
        }
      },
      {
        name            : this.l10n.t('Date'),
        valuePath       : 'startsAt',
        extraValuePaths : ['endsAt'],
        isSortable      : true,
        width           : 170,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-date'

      },
      {
        name          : this.l10n.t('Sessions'),
        valuePath     : 'generalStatistics',
        width         : 90,
        isSortable    : false,
        cellComponent : 'ui-table/cell/cell-sessions-dashboard'
      },
      {
        name          : this.l10n.t('Speakers'),
        valuePath     : 'generalStatistics',
        cellComponent : 'ui-table/cell/cell-speakers-dashboard',
        isSortable    : false
      },
      {
        name          : this.l10n.t('Public URL'),
        valuePath     : 'url',
        cellComponent : 'ui-table/cell/cell-link',
        width         : 240,
        isSortable    : false
      }
    ];
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
    } catch (e) {
      console.error('Error while deleting event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.setProperties({
      isLoading              : false,
      isEventDeleteModalOpen : false
    });
  }

  @action
  async restoreEvent(event_id) {
    this.set('isLoading', true);
    try {
      const event = this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.set('deletedAt', null);
      await event.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('Event has been restored successfully.'));
    } catch (e) {
      console.error('Error while restoring event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.set('isLoading', false);
  }
}
