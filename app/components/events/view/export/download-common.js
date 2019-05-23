import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  isDownloadDisabled : true,
  eventDownloadUrl   : '',
  isLoading          : false,
  fileFormat         : computed(function() {
    switch (this.downloadType) {
      case 'iCalendar':
        return 'ical';
      case 'Pentabarf XML':
        return 'pentabarf';
      case 'iCalendar XML (xCal)':
        return 'xcal';
      default:
        return ' ';
    }
  }),
  displayUrl: computed(function() {
    return this.get(`model.${  this.fileFormat  }Url`) !== null ? this.get(`model.${  this.fileFormat  }Url`) : 'Please publish to generate the link';
  }),
  requestLoop(exportJobInfo) {
    run.later(() => {
      this.loader
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            this.set('isDownloadDisabled', false);
            this.set('eventDownloadUrl', exportJobStatus.result.download_url);
            this.notify.success(this.l10n.t('Download Ready'));
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.set('eventExportStatus', exportJobStatus.state);
            this.notify.alert(this.l10n.t('Task is going on.'));
          } else {
            this.set('eventExportStatus', exportJobStatus.state);
            this.notify.error(this.l10n.t('Task failed.'));
          }
        })
        .catch(() => {
          this.set('eventExportStatus', 'FAILURE');
          this.notify.error(this.l10n.t('Task failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  },
  actions: {
    startExportTask() {
      this.set('isLoading', true);
      this.loader
        .load(`/events/${this.get('model.id')}/export/${this.fileFormat}`)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo);
        })
        .catch(() => {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('Unexpected error occurred.'));
        });
    }
  }
});
