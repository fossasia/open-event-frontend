import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    saveSocials() {
      this.set('isLoading', true);
      let settings = this.get('model');
      settings.save()
        .then(() => {
          this.set('isLoading', false);
          this.notify.success(this.l10n.t('Social links have been saved successfully.'));
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occured. Social links not saved.'));
        });
    }
  }
});
