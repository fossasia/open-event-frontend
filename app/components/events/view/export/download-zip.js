import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
export default class DownloadZip extends Component {
  @action
  async exportEventDownload(eventDownloadUrl) {
    this.set('isLoading', true);
    try {
      const res = await this.loader.downloadFile(eventDownloadUrl, null, { isExternal: true });
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
      this.notify.error(e, {
        id: 'err_down'
      });
    }
    this.set('isLoading', false);
  }

}
