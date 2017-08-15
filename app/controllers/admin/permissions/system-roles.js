import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    openAddSystemrRoleModal() {
      this.set('isAddSystemRoleModalOpen', true);
    },
    addSystemRole() {
      this.set('isLoading', true);
      this.get('store').createRecord('role', {
        name      : this.get('name'),
        titleName : this.get('titleName')
      }).save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('User permissions have been saved successfully.'));
          this.set('isAddSystemRoleModalOpen', false);
          this.setProperties({
            name          : null,
            roleTitleName : null
          });
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred. User permissions not saved.'));
        });
    },
    updatePermissions() {
      this.set('isLoading', true);
      this.get('model.userPermissions').save()
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
