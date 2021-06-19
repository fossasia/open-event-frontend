import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class OptionsController extends Controller {

  @service errorHandler;

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
      .catch(e => {
        console.error('Error while deleting event', e);
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
      const invite =  this.model.roleInvites.filter(invite => invite.email === this.currentInvite.email)[0];
      if (invite.id) {
        const res = await this.loader.post('/role-invites/' + invite.id + '/resend-invite');
        if (res.success) {
          this.notify.success(this.l10n.t('Invite resent successfully'),
            {
              id: 'resend_invite_succ'
            });
        } else {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
        }
        this.setProperties({
          'isConfirmEventTransferModalOpen' : false,
          'checked'                         : false
        });
        this.currentInvite.rollbackAttributes();
        this.set('isLoading', false);
        return;
      }

      await this.currentInvite.save();
      this.setProperties({
        'isConfirmEventTransferModalOpen' : false,
        'checked'                         : false
      });
      this.notify.success(this.l10n.t('Owner Role Invite sent successfully.'));
    } catch (error) {
      console.error('Error while sending role Invite', error, error.message);
      this.errorHandler.handle(error);
    }

    this.set('isLoading', false);
  }
}
