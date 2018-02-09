import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    openAddSystemRoleModal(role) {
      if (role) {
        this.set('role', role);
      } else {
        this.set('role', this.store.createRecord('role'));
      }
      this.set('isAddSystemRoleModalOpen', true);
    },
    deleteSystemRole(role) {
      this.set('isLoading', true);
      role.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('System role has been deleted successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred. System role was not deleted.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    addSystemRole() {
      this.set('isLoading', true);
      this.get('role').save()
        .then(() => {
          this.set('isAddSystemRoleModalOpen', false);
          this.notify.success(this.l10n.t('System role have been saved successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred. System role not saved.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    updatePermissions() {
      this.set('isLoading', true);
      this.get('model.userPermissions').save()
        .then(() => {
          this.notify.success(this.l10n.t('User permissions have been saved successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred. User permissions not saved.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
