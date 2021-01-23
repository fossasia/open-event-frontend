import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 100;
  sort_by = 'received-at';
  sort_dir = 'DSC';
  get columns() {
    return [
      {
        name          : this.l10n.t('For'),
        valuePath     : 'user',
        cellComponent : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-for'
      },
      {
        name            : this.l10n.t('Time'),
        valuePath       : 'receivedAt',
        cellComponent   : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-time',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name      : this.l10n.t('Actions'),
        valuePath : 'title'
      },
      {
        name          : this.l10n.t('Message'),
        valuePath     : 'message',
        cellComponent : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-sanitize'
      }
    ];
  }
}
