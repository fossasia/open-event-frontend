import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submit() {
      this.set('isLoading', true);
      let modules = this.model;
      modules.save()
        .then(() => {
          this.notify.success(this.l10n.t('Settings have been saved successfully.'),
            {
              id: 'setting_change'
            });
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'),
            {
              id: 'setting_not_change'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
