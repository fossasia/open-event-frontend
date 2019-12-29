import Controller from '@ember/controller';
import { computed } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 100;

  sort_by = 'time';

  sort_dir = 'ASC';

  @computed()
  get columns() {
    return [
      {
        name            : 'To',
        valuePath       : 'recipient',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Time',
        valuePath       : 'time',
        cellComponent   : 'ui-table/cell/admin/reports/system-logs/activity-logs/cell-time',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Actions',
        valuePath       : 'action',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Message',
        valuePath       : 'message',
        extraValuePaths : ['subject'],
        cellComponent   : 'ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message'
      }
    ];
  }

}
