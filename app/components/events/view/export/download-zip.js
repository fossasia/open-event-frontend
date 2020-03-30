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
      this.notify.success(this.l10n.t('Exported Event Downloaded successfully.'), {
        id: 'export_succ'
      });
    } catch (e) {
      console.error('Error while downloading event zip', e);
      this.notify.error(this.l10n.t(e), {
        id: 'err_down'
      });
    }
    this.set('isLoading', false);
  }

}
