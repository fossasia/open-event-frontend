import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    updateSettings() {
      this.set('isLoading', true);
      let settings = this.get('model');
      settings.save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('Settings have been saved successfully.'));
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'));
        });
    }
  }
});
