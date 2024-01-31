import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name          : 'Logo',
        valuePath     : 'logoUrl',
        cellComponent : 'ui-table/cell/cell-sponsor-image'
      },
      {
        name            : 'Name',
        valuePath       : 'name',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        width           : 300

      },
      {
        name          : 'Type',
        valuePath     : 'type',
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize',
        width         : 150
      }
    ];
  }
}
