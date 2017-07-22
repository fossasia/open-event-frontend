import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  actions: {
    saveImages() {
      this.set('isLoading', true);
      let images = this.get('model');
      images.save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('Image sizes have been saved successfully.'));
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occured. Image sizes not saved.'));
        });
    }
  }
});
