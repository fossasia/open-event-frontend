import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Controller.extend({

  isLoading: false,

  onSessionRoute: computed('session.currentRouteName', function() {
    let currentRouteName = this.get('session.currentRouteName');
    return currentRouteName !== 'events.view.sessions.create' && currentRouteName !== 'events.view.sessions.edit';
  }),

  actions: {
    export() {
      this.set('isLoading', true);
      this.loader
        .load(`/events/${this.get('model.id')}/export/sessions/csv`)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo);
        })
        .catch(() => {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'session_unexp_error'
            });
        });
    }
  },

  requestLoop(exportJobInfo) {
    run.later(() => {
      this.loader
        .load(exportJobInfo.task_url, { withoutPrefix: true })
        .then(exportJobStatus => {
          if (exportJobStatus.state === 'SUCCESS') {
            window.location = exportJobStatus.result.download_url;
            this.notify.success(this.l10n.t('Download Ready'),
              {
                id: 'download_ready'
              });
          } else if (exportJobStatus.state === 'WAITING') {
            this.requestLoop(exportJobInfo);
            this.notify.alert(this.l10n.t('Task is going on.'),
              {
                id: 'task_going'
              });
          } else {
            this.notify.error(this.l10n.t('CSV Export has failed.'),
              {
                id: 'csv_fail'
              });
          }
        })
        .catch(() => {
          this.notify.error(this.l10n.t('CSV Export has failed.'),
            {
              id: 'csv_export_fail'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }, 3000);
  }
});
