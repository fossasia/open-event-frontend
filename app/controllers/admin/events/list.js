import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {

   @or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

   @computed()
   get columns() {
     return [
       {
         name            : 'Name',
         valuePath       : 'id',
         extraValuePaths : ['logoUrl', 'identifier', 'deletedAt', 'name'],
         isSortable      : true,
         headerComponent : 'tables/headers/sort',
         cellComponent   : 'ui-table/cell/cell-event',
         width           : 180,
         options         : {
           hasRestorePrivileges: this.hasRestorePrivileges
         },
         actions: {
           moveToDetails        : this.moveToDetails.bind(this),
           editEvent            : this.editEvent.bind(this),
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
         cellComponent   : 'ui-table/cell/cell-simple-date',
         width           : 65,
         options         : {
           dateFormat: 'MMMM DD, YYYY - hh:mm A'
         }
       },
       {
         name            : 'Ends At',
         valuePath       : 'endsAt',
         isSortable      : true,
         headerComponent : 'tables/headers/sort',
         cellComponent   : 'ui-table/cell/cell-simple-date',
         width           : 65,
         options         : {
           dateFormat: 'MMMM DD, YYYY - hh:mm A'
         }
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
         valuePath     : 'eventStatisticsGeneral',
         cellComponent : 'ui-table/cell/cell-sessions',
         width         : 90

       },
       {
         name          : 'Speakers',
         valuePath     : 'eventStatisticsGeneral',
         cellComponent : 'ui-table/cell/cell-speakers-dashboard',
         width         : 90
       },
       {
         name          : 'Tickets',
         valuePath     : 'tickets',
         cellComponent : 'ui-table/cell/cell-tickets'
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
         extraValuePaths : ['isFeatured'],
         cellComponent   : 'ui-table/cell/admin/event-is-featured',
         width           : 80,
         actions         : {
           toggleFeatured: this.toggleFeatured.bind(this)
         }
       }
     ];
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
      let event =  this.store.peekRecord('event', this.eventId, { backgroundReload: false });
      await event.destroyRecord();
      this.notify.success(this.l10n.t('Event has been deleted successfully.'));
    } catch (e) {
      console.warn(e);
      if (e.errors[0].detail) {
        this.notify.error(this.l10n.tVar(e.errors[0].detail), {
          id: 'error_server_msg'
        });
      } else {
        this.notify.error(this.l10n.t('An unexpected error has occurred'), {
          id: 'unexpect_error'
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
      let event =  this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.set('deletedAt', null);
      await event.save({ adapterOptions: { getTrashed: true } });
      this.notify.success(this.l10n.t('Event has been restored successfully.'));
    } catch (e) {
      console.warn(e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.set('isLoading', false);
  }

  @action
  async toggleFeatured(event_id) {
    this.set('isLoading', true);
    try {
      let event =  this.store.peekRecord('event', event_id, { backgroundReload: false });
      event.toggleProperty('isFeatured');
      await event.save();
      this.notify.success(this.l10n.t('Event details modified successfully'));

    } catch (e) {
      console.warn(e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    }
    this.set('isLoading', false);
  }
}
