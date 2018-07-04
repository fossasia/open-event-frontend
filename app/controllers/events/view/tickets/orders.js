import Controller from '@ember/controller';
import { run } from '@ember/runloop';

export default Controller.extend({
  isLoadingcsv: false,

  isLoadingpdf: false,

  actions: {
    export(mode) {
      this.set(`isLoading${mode}`, true);
      this.get('loader')
        .load(`/events/${this.get('model.id')}/export/orders/${mode}`)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo, mode);
        })
        .catch(() => {
          this.set(`isLoading${mode}`, false);
          this.get('notify').error(this.get('l10n').t('An unexpected error has occurred.'));
        });
    }
  },
  requestLoop(exportJobInfo, mode) {
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
            this.get('notify').error(this.get('l10n').t(`${mode.toUpperCase()} Export has failed.`));
          }
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t(`${mode.toUpperCase()} Export has failed.`));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
});
