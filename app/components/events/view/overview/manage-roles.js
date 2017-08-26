import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames  : ['ui', 'fluid', 'card'],
  roleType    : 'accepted',
  roleInvites : computed('data.roleInvites.@each', 'roleType', function() {
    return this.get('data.roleInvites').filterBy('status', this.get('roleType'));
  }),
  actions: {
    openAddUserRoleModal(invite) {
      if (invite) {
        this.set('currentInvite', invite);
        this.set('isNewInvite', false);
      } else {
        const currentInvite = this.get('data.roleInvites').createRecord({});
        this.set('currentInvite', currentInvite);
        this.set('isNewInvite', true);
      }
      this.set('isAddUserRoleModalOpen', true);
    },
    updateUserRoles() {
      this.set('isLoading', true);
      const currentInvite = this.get('currentInvite');
      currentInvite.set('roleName', currentInvite.get('role.name'));
      this.get('currentInvite').save()
        .then(()=>{
          if (this.get('isNewInvite')) {
            this.get('data.roleInvites').addObject(currentInvite);
          }
          this.set('isAddUserRoleModalOpen', false);
          this.get('notify').success(this.get('isNewInvite') ? this.l10n.t('Role Invite sent successfully') : this.l10n.t('Role Invite updated successfully'));
        })
        .catch(()=> {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(()=> {
          this.set('isLoading', false);
        });
    },
    deleteUserRole(invite) {
      this.set('isLoading', true);
      this.get('data.roleInvites').removeObject(invite);
      invite.destroyRecord()
        .then(()=>{
          this.get('notify').success(this.l10n.t('Role Invite deleted successfully'));
        })
        .catch(()=> {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        })
        .finally(()=> {
          this.set('isLoading', false);
        });
    },

    filter(type) {
      this.set('roleType', type);
    }
  }
});
