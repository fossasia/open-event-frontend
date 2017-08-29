import Ember from 'ember';

const { Controller, run } = Ember;
export default Controller.extend({
  eventDownloadUrl   : '',
  eventExportStatus  : 'Event export not yet started.',
  isDownloadDisabled : true,
  data               : {
    image    : false,
    audio    : false,
    video    : false,
    document : false
  },
  requestLoop(exportJobInfo) {
    run.later(() => {
      this.get('loader')
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            this.set('isDownloadDisabled', false);
            this.set('eventDownloadUrl', exportJobStatus.result.download_url);
            this.set('eventExportStatus', exportJobStatus.state);
            this.get('notify').success(this.l10n.t('Event exported.'));
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.set('eventExportStatus', exportJobStatus.state);
            this.get('notify').alert(this.l10n.t('Event export is going on.'));
          } else {
            this.set('eventExportStatus', exportJobStatus.state);
            this.get('notify').error(this.l10n.t('Event export failed.'));
          }
        })
        .catch(() => {
          this.set('eventExportStatus', 'FAILURE');
          this.get('notify').error(this.l10n.t('Event export failed.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  },
  actions: {
    startGeneration() {
      this.set('isLoading', true);
      let payload = this.get('data');
      this.get('loader')
        .post(`/events/${this.get('model.id')}/export/json`, payload)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo);
        })
        .catch(() => {
          this.set('isLoading', false);
          this.get('notify').error(this.l10n.t('Unexpected error occurred.'));
        });
    }
  }
});
