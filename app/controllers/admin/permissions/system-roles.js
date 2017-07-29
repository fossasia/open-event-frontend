import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    openAddSystemrRoleModal() {
      this.set('isAddSystemRoleModalOpen', true);
    },
    addSystemRole() {
      this.set('isAddSystemRoleModalOpen', false);
    },
    updatePermissions() {
      this.set('isLoading', true);
      this.get('model').save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('User permissions have been saved successfully.'));
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred. User permissions not saved.'));
        });
    }
  }
});
