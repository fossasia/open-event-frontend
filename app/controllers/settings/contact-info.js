import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateContactInfo() {
      this.set('isLoading', true);
      let currentUser = this.get('model');
      currentUser.save()
        .then(() => {
          this.set('isLoading', false);
          this.get('notify').success(this.l10n.t('Your Contact Info has been updated'));
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('An unexpected error occurred'));
        });
    }
  }
});
