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
        isSortable      : true

      },
      {
        name          : 'Type',
        valuePath     : 'type',
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize'
      },
      {
        name          : 'Level',
        valuePath     : 'level',
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize'
      },
      {
        name          : 'Options',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/cell-sponsor-options',
        actions       : {
          editSponsor   : this.editSponsor.bind(this),
          deleteSponsor : this.deleteSponsor.bind(this)
        }
      }
    ];
  }

