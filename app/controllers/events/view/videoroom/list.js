import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  get columns() {
    return [
      {
        name      : 'Microlocation',
        valuePath : 'name'
      },
      {
        name      : 'Video room URL',
        valuePath : 'videoStream.url'
      },
      {
        name      : 'Pin',
        valuePath : 'videoStream.password'
      },
      {
        name      : 'Additional information',
        valuePath : 'videoStream.additionalInformation'
      }
    ];
  }
}
