import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    submit() {
      this.set('isLoading', true);
      let modules = this.get('model');
      modules.save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('Settings have been saved successfully.'));
        })
        .catch(() => {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occured. Settings not saved.'));
        });
    }
  }
});
