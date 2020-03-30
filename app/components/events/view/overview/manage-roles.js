import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames  : ['ui', 'fluid', 'card'],
  roleType    : 'accepted',
  roleInvites : computed('data.roleInvites.@each', 'roleType', function() {
    return this.data.roleInvites.filterBy('status', this.roleType);
  }),
  actions: {
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
    },
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
    },
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
    },

    filter(type) {
      this.set('roleType', type);
    }
  }
});
