import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name            : 'Session',
        valuePath       : 'title',
        isSortable      : 'true',
        headerComponent : 'tables/headers/sort'
      },
      {
        name      : 'Microlocation',
        valuePath : 'microlocation.name'
      },
      {
        name      : 'Track',
        valuePath : 'track.name'
      },
      {
        name      : 'Floor',
        valuePath : 'microlocation.floor'
      },
      {
        name      : 'Type',
        valuePath : 'sessionType.name'
      }
    ];
  }
}
