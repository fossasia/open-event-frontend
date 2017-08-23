import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateUser() {
      let user = this.get('model');
      user.save()
        .then(() => {
          this.get('notify').success(this.l10n.t('Your profile has been updated'));
        })
        .catch(() => {
          this.get('authManager.currentUser').rollbackAttributes();
          this.get('notify').error(this.l10n.t('An unexpected error occurred'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
