import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action, computed } from '@ember/object';

export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 25;

  get columns() {
    return [
      {
        name            : this.l10n.t('Microlocation'),
        valuePath       : 'name',
        extraValuePaths : ['id', 'videoStream', 'constructor'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-title',
        actions         : {
          delete: this.delete.bind(this)
        }
      },
      {
        name          : this.l10n.t('Video Source URL'),
        valuePath     : 'videoStream.url',
        cellComponent : 'ui-table/cell/events/view/videoroom/cell-video-url'
      },
      {
        name            : this.l10n.t('Join Video'),
        valuePath       : 'videoStream',
        extraValuePaths : ['identifier', 'event'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-url'
      },
      {
        name      : this.l10n.t('Room Password'),
        width     : 40,
        valuePath : 'videoStream.password'
      },
      {
        name      : this.l10n.t('Additional information'),
        valuePath : 'videoStream.additionalInformation'
      }
    ];
  }

  @computed('model.event')
  get events() {
    return [this.model.event];
  }

  get eventColumns() {
    const { columns } = this;
    columns[0].name = this.l10n.t('Event');

    return columns;
  }

  @action
  async delete(id) {
    this.set('isLoading', true);
    const stream = await this.store.peekRecord('video-stream', id, { backgroundReload: false });
    try {
      await stream.destroyRecord();
      this.notify.success(this.l10n.t('{{item}} has been deleted successfully.', { item: this.l10n.t('Video Stream') }),
        {
          id: 'stream_del'
        });
      this.refreshModel();
    } catch (e) {
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'stream_err'
        });
    }
    this.set('isLoading', false);
  }
}
