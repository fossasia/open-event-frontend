import Controller from '@ember/controller';
import { mapBy } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
  @mapBy('model.feedbacks', 'session.id') ratedSessions;

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
