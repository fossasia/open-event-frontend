
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action } from '@ember/object';
import { run } from '@ember/runloop';

export default class extends Controller.extend(EmberTableControllerMixin) {
    per_page = 10;

    @tracked isloading = false;

    get followersColumn() {
      return [
        {
          name            : this.l10n.t('User Image'),
          valuePath       : 'user.avatarUrl',
          extraValuePaths : ['user'],
          cellComponent   : 'ui-table/cell/cell-user-image'
        },
        {
          name      : this.l10n.t('Public Profile Name'),
          valuePath : 'user.publicName'
        },
        {
          name          : this.l10n.t('Group Join Date'),
          valuePath     : 'createdAt',
          cellComponent : 'ui-table/cell/cell-date',
          options       : {
            timezone   : 'UTC',
            dateFormat : 'dddd, D MMMM, YYYY h:mm A'
          }
        },
        {
          name      : this.l10n.t('Email'),
          valuePath : 'user.email'
        }
      ];
    }

    @action
    refreshRoute() {
      this.refresh();
    }

    @action
    export(group_id) {
      this.set('isLoading', true);
      this.loader
        .post(`/group/${group_id}/export/followers/csv`)
        .then(exportJobInfo => {
          this.requestLoop(exportJobInfo);
        })
        .catch(e => {
          console.error('Error while exporting', e);
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'follower_unexp_error'
            });
        });
    }

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
}
