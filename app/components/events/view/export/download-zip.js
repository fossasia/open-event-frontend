import Component from '@ember/component';
import { action } from '@ember/object';

export default class extends Component {
    @action
  exportEventDownload(eventDownloadUrl) {
    this.set('isLoading', true);
    this.loader
      .load(`${eventDownloadUrl}`, { withoutPrefix: true })
      .then(res => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(new Blob([res], { type: 'octet/stream' }));
        anchor.download = 'EventExport.zip';
        anchor.click();
        this.notify.success(this.l10n.t('Exported Event Downloaded successfully.'));
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
