import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames  : ['ui', 'fluid', 'card'],
  roleType    : 'accepted',
  roleInvites : computed('data.roleInvites.@each', 'roleType', function() {
    return this.get('data.roleInvites').filterBy('status', this.roleType);
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
            this.get('data.roleInvites').addObject(this.currentInvite);
          }
          this.set('isAddUserRoleModalOpen', false);
          this.notify.success(this.isNewInvite ? this.l10n.t('Role Invite sent successfully') : this.l10n.t('Role Invite updated successfully'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    deleteUserRole(invite) {
      this.set('isLoading', true);
      invite.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Role Invite deleted successfully'));
          this.get('data.roleInvites').removeObject(invite);
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'));
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
