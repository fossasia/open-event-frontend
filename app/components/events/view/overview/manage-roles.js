import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('ui', 'fluid', 'card')
export default class ManageRoles extends Component {
  roleType = 'accepted';

  @computed('data.roleInvites.@each', 'roleType')
  get roleInvites() {
    return this.data.roleInvites.filterBy('status', this.roleType);
  }

  @action
  openAddUserRoleModal(invite) {
    if (invite) {
      this.set('currentInvite', invite);
      this.set('isNewInvite', false);
    } else {
      const currentInvite = this.data.roleInvites.createRecord({});
      this.set('currentInvite', currentInvite);
      this.set('isNewInvite', true);
    }
    this.set('isAddUserRoleModalOpen', true);
  }

  @action
  updateUserRoles() {
    this.set('isLoading', true);
    this.currentInvite.set('roleName', this.currentInvite.get('role.name'));
    this.currentInvite.save()
      .then(() => {
        if (this.isNewInvite) {
          this.data.roleInvites.addObject(this.currentInvite);
        }
        this.set('isAddUserRoleModalOpen', false);
        this.notify.success(this.isNewInvite ? this.l10n.t('Role Invite sent successfully') : this.l10n.t('Role Invite updated successfully'), {
          id: 'man_role'
        });
      })
      .catch(e => {
        console.error('Error while updating role invite', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'), {
          id: 'man_role_err'
        });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  deleteUserRole(invite) {
    this.set('isLoading', true);
    invite.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Role Invite deleted successfully'), {
          id: 'del_role_succ'
        });
        this.data.roleInvites.removeObject(invite);
      })
      .catch(e => {
        console.error('Error while deleting role invite', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'), {
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
