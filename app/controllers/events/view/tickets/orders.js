import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { computed, action } from '@ember/object';
import { or } from '@ember/object/computed';

export default class extends Controller {
  isLoadingcsv = false;

  isLoadingpdf = false;

  @computed('authManager.currentUser.isAdmin', 'authManager.currentUser.isSuperAdmin')
  get showDeletedRoute() {
    return or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin');
  }

  @action
  export(mode) {
    this.set(`isLoading${mode}`, true);
    this.loader
      .load(`/events/${this.get('model.id')}/export/orders/${mode}`)
      .then(exportJobInfo => {
        this.requestLoop(exportJobInfo, mode);
      })
      .catch(() => {
        this.set(`isLoading${mode}`, false);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      });
  }

  @action
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
            this.notify.error(this.l10n.t(`${mode.toUpperCase()} Export has failed.`));
          }
        })
        .catch(() => {
          this.notify.error(this.l10n.t(`${mode.toUpperCase()} Export has failed.`));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
}
