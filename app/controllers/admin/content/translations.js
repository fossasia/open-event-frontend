import Controller from '@ember/controller';

export default Controller.extend({
  isLoading: false,

  actions: {
    translationsDownload() {
      this.set('isLoading', true);
      this.loader
        .downloadFile('/admin/content/translations/all')
        .then(res => {
          const anchor = document.createElement('a');
          anchor.style.display = 'none';
          anchor.href = URL.createObjectURL(new Blob([res], { type: 'octet/stream' }));
          anchor.download = 'Translations.zip';
          anchor.click();
          this.notify.success(this.l10n.t('Translations Zip generated successfully.'));
        })
        .catch(e => {
          console.warn(e);
          this.notify.error(this.l10n.t('Unexpected error occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
