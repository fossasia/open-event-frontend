import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {

  @action
  openDeleteEventModal() {
    this.set('isEventDeleteModalOpen', true);
  }

  @action
  deleteEvent() {
    this.set('isLoading', true);
    this.model.event.destroyRecord()
      .then(() => {
        this.transitionToRoute('events');
        this.notify.success(this.l10n.t('Event has been deleted successfully.'),
          {
            id: 'event_deleted_succ'
          });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'event_deleted_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
    this.set('isEventDeleteModalOpen', false);
  }

  @action
  openEventTransferModal(id, name) {
    this.setProperties({
      'isEventTransferModalOpen' : true,
      'confirmEventName'         : '',
      'eventId'                  : id,
      'eventName'                : name
    });
  }

  @action
  openConfirmEventTransferModal() {
    const currentInvite = this.model.roleInvites.createRecord({});
    const { roles } = this.model;
    for (const role of roles ? roles.toArray() : []) {
      if (role.name === 'owner') {
        currentInvite.set('role', role);
      }
    }

    this.setProperties({
      'isEventTransferModalOpen'        : false,
      'isConfirmEventTransferModalOpen' : true,
      'checked'                         : false,
      currentInvite
    });
  }

  @action
  async transferEvent() {
    try {
      this.set('isLoading', true);
      this.currentInvite.set('roleName', 'owner');
      await this.currentInvite.save();
      this.setProperties({
        'isConfirmEventTransferModalOpen' : false,
        'checked'                         : false
      });
      this.notify.success(this.l10n.t('Owner Role Invite sent successfully.'));
    } catch (error) {
      this.notify.error(error.message);
    }

    this.set('isLoading', false);
  }
}
