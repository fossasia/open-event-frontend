import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

@classic
export default class OrdersController extends Controller {
  isLoadingcsv = false;
  isLoadingpdf = false;

  @tracked
  start_date = this.router.currentRoute.queryParams?.start_date;

  @tracked
  end_date = this.router.currentRoute.queryParams?.end_date;

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

  @action
  orderFilter(name) {
    if (name === 'date') {
      if (!this.start_date || !this.end_date) {
        this.router.transitionTo('events.view.tickets.orders.list', {
          queryParams: {
            filter: name
          }
        });
        return;
      }
      this.router.transitionTo('events.view.tickets.orders.list', {
        queryParams: {
          start_date : this.start_date,
          end_date   : this.end_date,
          filter     : name
        }
      });
    } else {
      this.router.transitionTo('events.view.tickets.orders.list', {
        queryParams: {
          filter: name
        }
      });
    }
  }

  @action
  onChangeStartDate() {
    if (!this.end_date) {
      return;
    }
    this.router.transitionTo('events.view.tickets.orders.list', {
      queryParams: {
        start_date : this.start_date,
        end_date   : this.end_date,
        filter     : 'date'
      }
    });
  }

  @action
  onChangeEndDate() {
    if (!this.start_date) {
      return;
    }
    this.router.transitionTo('events.view.tickets.orders.list', {
      queryParams: {
        start_date : this.start_date,
        end_date   : this.end_date,
        filter     : 'date'
      }
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
            this.requestLoop(exportJobInfo, mode);
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
