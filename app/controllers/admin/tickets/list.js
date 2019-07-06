import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @computed()
  get columns() {
    return [
      {
        name            : 'Order',
        valuePath       : 'order',
        cellComponent   : 'ui-table/cell/admin/tickets/cell-order'
      },
      {
        name            : 'Date and Time',
        valuePath       : 'startsAt',
        isSortable      : true,
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/tickets/orders/cell-date'
      }
    ]
  }

  @computed('model.data')
  get rows() {
    const rows = [];
    this.model.data.forEach(row => {
      console.log('SOMETHING AWESOME ', row);
      rows.pushObject({
        order    : row,
        startsAt : row
      });
    });
    return rows;
  }
}