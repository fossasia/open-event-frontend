import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model').save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Session details have been saved'));
          this.transitionToRoute('events.view.sessions');
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('Oops something went wrong. Please try again'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
