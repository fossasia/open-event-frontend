import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';

@classic
export default class OrdersController extends Controller {
  isLoadingcsv = false;
  isLoadingpdf = false;

  @action
  export(mode) {
    this.set(`isLoading${mode}`, true);
    this.loader
      .load(`/events/${this.model.id}/export/orders/${mode}`)
      .then(exportJobInfo => {
        this.requestLoop(exportJobInfo, mode);
      })
      .catch(e => {
        console.error('Error while exporting', e);
        this.set(`isLoading${mode}`, false);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      });
  }

  requestLoop(exportJobInfo, mode) {
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
            this.notify.error(mode.toUpperCase() + ' ' + this.l10n.t('Export has failed.'));
          }
        })
        .catch(e => {
          console.error('Error while exporting', e);
          this.notify.error(mode.toUpperCase() + ' ' + this.l10n.t('Export has failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
}
