import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';


interface Args {
  videoStream: VideoStream;
  event: Event,
}

export default class JoinVideo extends Component<Args> {
  @service router: any;
  @service loader!: Loader;
  @service confirm: any;
  @service l10n: any;

  @tracked hasStreams = false;
  @tracked canAccess = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.setup();
  }

  async setup(): Promise<void> {
    const streamStatus = await this.loader.load(`/events/${this.args.event.id}/has-streams`);
    const { exists, can_access } = streamStatus;
    this.hasStreams = exists;
    this.canAccess = can_access;
  }

  openPanel(): void {
    if (this.canAccess) {
      this.router.transitionTo('public', this.args.event, { queryParams: { side_panel: true } })
    } else {
      this.router.transitionTo('public', this.args.event, { queryParams: { video_dialog: true } })
    }
  }
}
