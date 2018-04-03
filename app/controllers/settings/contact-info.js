import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    updateContactInfo() {
      this.set('isLoading', true);
      let currentUser = this.get('model');
      currentUser.save()
        .then(() => {
          this.get('notify').success(this.l10n.t('Your Contact Info has been updated'));
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('An unexpected error occurred'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
