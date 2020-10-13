import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name      : 'Microlocation',
        valuePath : 'microlocation.name'
      },
      {
        name      : 'Video room URL',
        valuePath : 'videoUrl'
      },
      {
        name      : 'Pin',
        valuePath : ''
      },
      {
        name      : 'Access',
        valuePath : ''
      },
      {
        name      : 'Track',
        valuePath : 'track.name'
      },
      {
        name      : 'Type',
        valuePath : 'sessionType.name'
      }
    ];
  }
}
