import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save() {
      this.set('isLoading', true);
      this.get('model.speaker').save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Speaker details have been saved'));
          this.transitionToRoute('public.cfs.index');
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
