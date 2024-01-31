import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 100;
  sort_by = 'time';
  sort_dir = 'DSC';

  get columns() {
    return [
      {
        name            : this.l10n.t('Actor'),
        valuePath       : 'actor',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : this.l10n.t('Time'),
        valuePath       : 'time',
        cellComponent   : 'ui-table/cell/admin/reports/system-logs/activity-logs/cell-time',
        headerComponent : 'tables/headers/sort',
        isSortable      : true

      },
      {
        name      : this.l10n.t('Actions'),
        valuePath : 'action'
      }];
  }
}
