import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { action } from '@ember/object';

export default class ExportController extends Controller {
  eventDownloadUrl   = '';
  eventExportStatus  = 'Event export not yet started.';
  isDownloadDisabled = true;
  data               = {
    image    : false,
    audio    : false,
    video    : false,
    document : false
  };

  requestLoop(exportJobInfo) {
    run.later(() => {
      this.loader
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            this.set('isDownloadDisabled', false);
            this.set('eventDownloadUrl', exportJobStatus.result.download_url);
            this.set('eventExportStatus', exportJobStatus.state);
            this.notify.success(this.l10n.t('Event exported.'),
              {
                id: 'event_export_succ'
              });
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.set('eventExportStatus', exportJobStatus.state);
            this.notify.alert(this.l10n.t('Event export is going on.'),
              {
                id: 'event_export_inprog'
              });
          } else {
            this.set('eventExportStatus', exportJobStatus.state);
            this.notify.error(this.l10n.t('Event export failed.'),
              {
                id: 'export_fail'
              });
          }
        })
        .catch(() => {
          this.set('eventExportStatus', 'FAILURE');
          this.notify.error(this.l10n.t('Event export failed.'),
            {
              id: 'event_exp_fail'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }

  @action
  startGeneration() {
    this.set('isLoading', true);
    const payload = this.data;
    this.loader
      .post(`/events/${this.model.id}/export/json`, payload)
      .then(exportJobInfo => {
        this.requestLoop(exportJobInfo);
      })
      .catch(() => {
        this.set('isLoading', false);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'event_error_export'
          });
      });
  }
}
