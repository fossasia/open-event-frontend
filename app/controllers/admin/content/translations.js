import Controller from '@ember/controller';

export default Controller.extend({
  isLoading: false,

  actions: {
    translationsDownload() {
      this.set('isLoading', true);
      this.get('loader')
        .downloadFile('/admin/content/translations/all')
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Translations Zip generated successfully.'));
        })
        .catch(e => {
          console.warn(e);
          this.get('notify').error(this.get('l10n').t('Unexpected error occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
