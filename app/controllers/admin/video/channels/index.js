import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
    sort_dir = 'name';
    per_page = 10;

    @tracked isloading = false;

    get columns() {
      return [
        {
          name      : this.l10n.t('Name'),
          valuePath : 'name',
          width     : 50
        },
        {
          name      : this.l10n.t('Provider'),
          valuePath : 'provider',
          width     : 50
        },
        {
          name      : this.l10n.t('URL'),
          valuePath : 'url'
        },
        {
          name      : this.l10n.t('Api URL'),
          valuePath : 'apiUrl'
        },
        {
          name      : this.l10n.t('Api Key'),
          valuePath : 'apiKey'
        },
        {
          name          : this.l10n.t('Actions'),
          cellComponent : 'ui-table/cell/cell-channel-action',
          valuePath     : 'id',
          width         : 40,
          actions       : {
            deleteChannel : this.deleteChannel.bind(this),
            editChannel   : this.editChannel.bind(this)
          }
        }
      ];
    }

    @action
    async deleteChannel(videoChannel_id) {
      this.set('isLoading', true);
      try {
        const videoChannel =  this.store.peekRecord('video-channel', videoChannel_id, { backgroundReload: false });
        await videoChannel.destroyRecord();
        this.notify.success(this.l10n.t('Video channel has been deleted successfully.'),
          {
            id: 'channel_deleted_succ'
          });
        this.refreshModel.bind(this)();
      } catch (e) {
        console.error('Error while deleting video channel', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'unexpected_channel_error'
          });
      }
      this.set('isLoading', false);
    }

    @action
    editChannel(videoChannel_id) {
      this.transitionToRoute('admin.video.channels.edit', videoChannel_id);
    }
}
