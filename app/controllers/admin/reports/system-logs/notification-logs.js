import Controller from '@ember/controller';
import { computed } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 100;

  sort_by = 'received-at';

  sort_dir = 'ASC';

  @computed()
  get columns() {
    return [
      {
        name          : 'For',
        valuePath     : 'user',
        cellComponent : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-for'
      },
      {
        name            : 'Time',
        valuePath       : 'receivedAt',
        cellComponent   : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-time',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name      : 'Actions',
        valuePath : 'title'
      },
      {
        name          : 'Message',
        valuePath     : 'message',
        cellComponent : 'ui-table/cell/admin/reports/system-logs/notification-logs/cell-sanitize'
      }
    ];
  }
}
