import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class extends Controller {

  @service errorHandler;

  @tracked roleType = true;

  @computed('model.group.roles.@each', 'roleType')
  get roleInvites() {
    return this.model.group.roles.filterBy('accepted', this.roleType);
  }

  @action
  openAddUserRoleModal() {
    const currentInvite = this.model.group.roles.createRecord({});
    this.set('currentInvite', currentInvite);
    this.set('isAddUserRoleModalOpen', true);
  }

  @action
  addUserRoles() {
    this.set('isLoading', true);
    this.currentInvite.save()
      .then(() => {
        this.set('isAddUserRoleModalOpen', false);
        this.notify.success(this.isNewInvite ? this.l10n.t('Role Invite sent successfully.') : this.l10n.t('Role Invite updated successfully.'), {
          id: 'man_role'
        });
      })
      .catch(e => {
        console.error('Error while updating role invite', e);
        this.errorHandler.handle(e);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  async resendInvite(invite) {
    this.set('isLoading', true);
    try {
      const res = await this.loader.post('/group-role-invites/' + invite.id + '/resend-invite');
      if (res.success) {
        this.notify.success(this.l10n.t('Invite resent successfully.'),
          {
            id: 'resend_invite_succ'
          });
      } else {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
      }
    } catch (error) {
      console.error('Error while resending invite', error);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
    } finally {
      this.set('isLoading', false);
    }
  }

  @action
  deleteUserRole(groupRole) {
    this.set('isLoading', true);
    groupRole.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Role deleted successfully.'), {
          id: 'del_role_succ'
        });
        this.model.group.roles.removeObject(groupRole);
      })
      .catch(e => {
        console.error('Error while deleting role', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'), {
          id: 'err_man_role'
        });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  filter(type) {
    this.set('roleType', type === 'accepted' ? true : false);
  }
}
