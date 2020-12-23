import Component from '@glimmer/component';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Event from 'open-event-frontend/models/event';

interface Args {
  videoStream: VideoStream,
  event: Event
}

export default class PublicStreamSidePanel extends Component<Args> {
  @tracked shown = false;
  @tracked loading = true;

  @action
  async setup(): Promise<void> {
    console.log('>>>>>>>', this.args.videoStream, this.args.event)
  }
}
