import Controller from '@ember/controller';
import { action } from '@ember/object';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {

   @or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

   get columns() {
     return [
       {
         name            : 'Name',
         valuePath       : 'name',
         extraValuePaths : ['logoUrl', 'identifier', 'deletedAt', 'name'],
         isSortable      : true,
         headerComponent : 'tables/headers/sort',
         cellComponent   : 'ui-table/cell/cell-event',
         width           : 180,
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
         name            : 'Starts At',
         valuePath       : 'startsAt',
         isSortable      : true,
         headerComponent : 'tables/headers/sort',
         extraValuePaths : ['timezone'],
         cellComponent   : 'ui-table/cell/cell-simple-date',
         width           : 75
       },
       {
         name            : 'Ends At',
         valuePath       : 'endsAt',
         isSortable      : true,
         extraValuePaths : ['timezone'],
         headerComponent : 'tables/headers/sort',
         cellComponent   : 'ui-table/cell/cell-simple-date',
         width           : 75
       },
       {
         name            : 'State',
         valuePath       : 'state',
         isSortable      : true,
         headerComponent : 'tables/headers/sort',
         width           : 80
       },
       {
         name            : 'Roles',
         valuePath       : 'owner',
         extraValuePaths : ['organizers', 'coorganizers', 'trackOrganizers', 'registrars', 'moderators'],
         cellComponent   : 'ui-table/cell/cell-roles',
         width           : 185
       },
       {
         name          : 'Sessions',
         valuePath     : 'generalStatistics',
         cellComponent : 'ui-table/cell/cell-sessions',
         width         : 90

       },
       {
         name          : 'Speakers',
         valuePath     : 'generalStatistics',
         cellComponent : 'ui-table/cell/cell-speakers-dashboard',
         width         : 90
       },
       {
         name          : 'Public URL',
         valuePath     : 'url',
         cellComponent : 'ui-table/cell/cell-link',
         width         : 220
       },
       {
         name            : 'Featured Event',
         valuePath       : 'id',
         isSortable      : true,
         extraValuePaths : ['isFeatured'],
         cellComponent   : 'ui-table/cell/admin/events/event-is-featured',
         headerComponent : 'tables/headers/sort',
         width           : 80,
         actions         : {
           toggleFeatured: this.toggleFeatured.bind(this)
         }
       },
       {
         name            : 'Promoted Event',
         valuePath       : 'id',
         isSortable      : true,
         extraValuePaths : ['isPromoted'],
         cellComponent   : 'ui-table/cell/admin/events/event-is-promoted',
         headerComponent : 'tables/headers/sort',
         width           : 80,
         actions         : {
           togglePromoted: this.togglePromoted.bind(this)
         }
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
      const event =  this.store.peekRecord('event', this.eventId, { backgroundReload: false });
      await event.destroyRecord();
      this.notify.success(this.l10n.t('Event has been deleted successfully.'),
        {
          id: 'event_del_succ'
        });
      this.refreshModel.bind(this)();
    } catch (e) {
      console.error('Error while deleting event', e);
      if (e.errors?.[0]?.detail) {
        this.notify.error(this.l10n.tVar(e.errors[0].detail), {
          id: 'event_delete_server_error'
        });
      } else {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'event_delete_unknown_error'
          });
      }
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
      const event =  this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.set('deletedAt', null);
      await event.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('Event has been restored successfully.'),
        {
          id: 'event_restored'
        });
    } catch (e) {
      console.error('Error while restoring event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'restore_error'
        });
    }
    this.set('isLoading', false);
  }

  @action
  async toggleFeatured(event_id) {
    this.set('isLoading', true);
    try {
      const event =  this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.toggleProperty('isFeatured');
      await event.save();
      this.notify.success(this.l10n.t('Event details modified successfully'),
        {
          id: 'event_detail_changed'
        });

    } catch (e) {
      console.error('Error while toggling featured event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'event_det_error'
        });
    }
    this.set('isLoading', false);
  }

  @action
  async togglePromoted(event_id) {
    this.set('isLoading', true);
    try {
      const event =  this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.toggleProperty('isPromoted');
      await event.save();
      this.notify.success(event.isPromoted ? this.l10n.t('Event promoted successfully') : this.l10n.t('Event unpromoted successfully'),
        {
          id: 'event_detail_changed'
        });
    } catch (e) {
      console.error('Error while toggling promoted event', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'event_det_error'
        });
    }
    this.set('isLoading', false);
  }
}
