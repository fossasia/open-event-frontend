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
        name          : 'Video room URL',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-video-url'
      },
      {
        name      : 'Pin',
        valuePath : ''
      },
      {
        name          : 'Additional information',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-additional-info'
      },
      {
        name      : 'Access',
        valuePath : ''
      },
      {
        name      : 'Stream',
        valuePath : ''
      },
      {
        name          : 'Additional information Stream',
        valuePath     : 'id',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-additional-info'
      }
    ];
  }
}
