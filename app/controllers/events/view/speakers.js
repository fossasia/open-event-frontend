import Controller from '@ember/controller';
import { run } from '@ember/runloop';

export default Controller.extend({

  isLoading: false,

  actions: {
    export() {
      this.set('isLoading', true);
      this.get('loader')
        .load(`/events/${this.get('model.id')}/export/speakers/csv`)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo);
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.get('l10n').t('An unexpected error has occurred.'));
        });
    }
  },

  requestLoop(exportJobInfo) {
    run.later(() => {
      this.get('loader')
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            window.location = exportJobStatus.result.download_url;
            this.get('notify').success(this.get('l10n').t('Download Ready'));
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.get('notify').alert(this.get('l10n').t('Task is going on.'));
          } else {
            this.get('notify').error(this.get('l10n').t('CSV Export has failed.'));
          }
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('CSV Export has failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
});
