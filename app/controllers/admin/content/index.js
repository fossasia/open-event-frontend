import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveSocials() {
      this.set('isLoading', true);
      let settings = this.model;
      settings.save()
        .then(() => {
          this.notify.success(this.l10n.t('Social links have been saved successfully.'),
            {
              id: 'social_link_upd'
            });
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred. Social links not saved.'),
            {
              id: 'unex_social_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
