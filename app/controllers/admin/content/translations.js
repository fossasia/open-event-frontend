import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  isLoading = false;

  @action
  async translationsDownload() {
    this.set('isLoading', true);
    try {
      const result = this.loader.downloadFile('/admin/content/translations/all/');
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = URL.createObjectURL(new Blob([result], { type: 'octet/stream' }));
      anchor.download = 'Translations.zip';
      anchor.click();
      this.notify.success(this.l10n.t('Translations Zip generated successfully.'),
        {
          id: 'zip_generated_succ'
        });
    } catch (e) {
      console.error('Error downloading translation zip', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'zip_error'
        });
    }
    this.set('isLoading', false);
  }
}
