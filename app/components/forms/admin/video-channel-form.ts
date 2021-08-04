import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import VideoChannel from 'open-event-frontend/models/video-channel';

interface Args {
  videoChannel: VideoChannel
}

export default class VideoChannelForm extends Component<Args> {
  @service l10n: any;
  @service router: any;
  @service notify: any;
  @service errorHandler: any;

  @tracked loading = false;


  @action async save(): Promise<void> {
    try {
      this.loading = true;
      await this.args.videoChannel.save();
      this.router.transitionTo('admin.video.channels.index');
      this.notify.success(this.l10n.t('Your video channel has been saved'),
        {
          id: 'channel_save'
        });
    } catch (e) {
      console.error('Error while saving video channel', e);
      this.errorHandler.handle(e);
    } finally {
      this.loading = false;
    }
  }

}
