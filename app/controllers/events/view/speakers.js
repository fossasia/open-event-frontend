import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { action } from '@ember/object';

export default class extends Controller {

  isLoading = false;

  @action
  export(status) {
    this.set('isLoading', true);
    const payload = {
      status
    };
    this.loader
      .post(`/events/${this.model.id}/export/speakers/csv`, payload)
      .then(exportJobInfo => {
        this.requestLoop(exportJobInfo);
      })
      .catch(e => {
        console.error('Error while exporting', e);
        this.set('isLoading', false);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      });
  }

  requestLoop(exportJobInfo) {
    run.later(() => {
      this.loader
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            window.location = exportJobStatus.result.download_url;
            this.notify.success(this.l10n.t('Download Ready'));
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.notify.alert(this.l10n.t('Task is going on.'));
          } else {
            this.notify.error(this.l10n.t('CSV Export has failed.'));
          }
        })
        .catch(e => {
          console.error('Error while exporting CSV', e);
          this.notify.error(this.l10n.t('CSV Export has failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
}
