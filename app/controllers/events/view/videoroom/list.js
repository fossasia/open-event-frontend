import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action } from '@ember/object';

export default class extends Controller.extend(EmberTableControllerMixin) {
  per_page = 25;

  get columns() {
    return [
      {
        name            : this.l10n.t('Microlocation'),
        valuePath       : 'name',
        extraValuePaths : ['id', 'videoStream'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-title',
        width           : 70,
        actions         : {
          delete: this.delete.bind(this)
        }
      },
      {
        name      : this.l10n.t('Video room URL'),
        valuePath : 'videoStream.url'
      },
      {
        name            : this.l10n.t('Link'),
        valuePath       : 'videoStream',
        extraValuePaths : ['event'],
        cellComponent   : 'ui-table/cell/events/view/videoroom/cell-stream-url'
      },
      {
        name      : this.l10n.t('Pin'),
        valuePath : 'videoStream.password',
        width     : 20
      },
      {
        name      : this.l10n.t('Additional information'),
        valuePath : 'videoStream.additionalInformation'
      }
    ];
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
