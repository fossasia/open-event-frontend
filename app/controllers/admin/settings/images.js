import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveImages() {
      this.set('isLoading', true);
      let images = this.get('model');
      images.save()
        .then(() => {
          this.notify.success(this.l10n.t('Image sizes have been saved successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occurred. Image sizes not saved.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
