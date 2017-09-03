import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    saveUrl() {
      this.get('authManager.currentUser').save()
        .then(() => {
          this.get('notify').success(this.l10n.t('URL saved successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('An unexpected error has occured'));
        });
    }
  }
});
