import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { action } from '@ember/object';

export default class extends Controller {

  isLoading = false;

  @action
  export() {
    this.set('isLoading', true);
    this.loader
      .load(`/events/${this.model.id}/export/speakers/csv`)
      .then(exportJobInfo => {
        this.requestLoop(exportJobInfo);
      })
      .catch(() => {
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
        .catch(() => {
          this.notify.error(this.l10n.t('CSV Export has failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
}
