import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  sort_by = 'starts-at';

  get columns() {
    return [
      {
        name            : this.l10n.t('Name'),
        valuePath       : 'name',
        width           : 180,
        isSortable      : true,
        extraValuePaths : ['identifier', 'logoUrl'],
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-general',
        options         : {
          dateFormat: 'D MMM, YYYY h:mm A'
        }
      },
      {
        name            : this.l10n.t('Date'),
        valuePath       : 'startsAt',
        extraValuePaths : ['endsAt', 'timezone'],
        isSortable      : true,
        width           : 220,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/cell-event-date'

      },
      {
        name          : this.l10n.t('Roles'),
        valuePath     : 'roles',
        width         : 180,
        cellComponent : 'ui-table/cell/cell-roles'
      },
      {
        name            : this.l10n.t('Tickets'),
        width           : 180,
        valuePath       : 'tickets',
        extraValuePaths : ['totalSales'],
        cellComponent   : 'ui-table/cell/cell-tickets'
      },
      {
        name          : this.l10n.t('Sessions'),
        valuePath     : 'generalStatistics',
        cellComponent : 'ui-table/cell/cell-sessions-dashboard'
      },
      {
        name          : this.l10n.t('Speakers'),
        valuePath     : 'generalStatistics',
        cellComponent : 'ui-table/cell/cell-speakers-dashboard'
      },
      {
        name          : this.l10n.t('Public URL'),
        valuePath     : 'url',
        width         : 220,
        cellComponent : 'ui-table/cell/cell-link'
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
