import Component from '@ember/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  async exportEventDownload(eventDownloadUrl) {
    this.set('isLoading', true);
    try {
      const res = await this.loader.downloadFile(`${eventDownloadUrl}`);
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = URL.createObjectURL(new Blob([res], { type: 'octet/stream' }));
      anchor.download = 'EventExport.zip';
      anchor.click();
      this.notify.success(this.l10n.t('Exported Event Downloaded successfully.'));
    } catch (e) {
      console.error(e);
      this.notify.error(this.l10n.t(e));
    }
    this.set('isLoading', false);
  }

}
