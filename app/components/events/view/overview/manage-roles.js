import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

@classic
@classNames('ui', 'fluid', 'card')
export default class ManageRoles extends Component {
  @tracked roleType = 'accepted';

  @service errorHandler;

  @computed('data.roleInvites.@each', 'roleType')
  get roleInvites() {
    return this.data.roleInvites.filterBy('status', this.roleType);
  }

  @action
  openAddUserRoleModal() {
    const currentInvite = this.data.roleInvites.createRecord({});
    this.set('currentInvite', currentInvite);
    this.set('isAddUserRoleModalOpen', true);
  }

  @action
  addUserRoles() {
    this.set('isLoading', true);
    this.currentInvite.set('roleName', this.currentInvite.get('role.name'));
    this.currentInvite.save()
      .then(() => {
        this.data.roleInvites.addObject(this.currentInvite);
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
      const res = await this.loader.post('/role-invites/' + invite.id + '/resend-invite');
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
  deleteUserRoleInvite(invite) {
    this.set('isLoading', true);
    invite.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Role Invite deleted successfully.'), {
          id: 'del_role_succ'
        });
        this.data.roleInvites.removeObject(invite);
      })
      .catch(e => {
        console.error('Error while deleting role invite', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'), {
          id: 'err_man_role'
        });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  deleteUserRole(eventRole) {
    this.set('isLoading', true);
    eventRole.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Role deleted successfully.'), {
          id: 'del_role_succ'
        });
        this.data.usersEventsRoles.removeObject(eventRole);
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
    this.set('roleType', type);
  }
}
