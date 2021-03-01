import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import { tracked } from '@glimmer/tracking';
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';
import { action } from '@ember/object';
import EventService from 'open-event-frontend/services/event';

interface Args {
  videoStream: VideoStream;
  event: Event;
  showSidePanel: () => void
}

export default class JoinVideo extends Component<Args> {
  @service router: any;
  @service loader!: Loader;
  @service confirm: any;
  @service l10n: any;
  @service session : any;
  @service declare event: EventService;

  @tracked hasStreams = false;
  @tracked canAccess = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.setup();
  }

  async setup(): Promise<void> {
    const streamStatus = await this.event.hasStreams(this.args.event.id);
    const { exists, can_access } = streamStatus;
    this.hasStreams = exists;
    this.canAccess = can_access;
  }

  @action
  openPanel(): void {
    const currentRoute  = this.router.currentRoute.name;
    const url = window.location.href;
    let id = null;
    if (this.canAccess) {
      this.args.showSidePanel?.();
      if (currentRoute === 'public.session.view.index') {
        id = (url.split('/session/')[1]).split('?')[0];
      } else if (currentRoute === 'public.exhibition.view') {
        id = (url.split('/exhibition/')[1]).split('?')[0];
      }
      this.router.transitionTo(currentRoute, this.args.event, id, { queryParams: { side_panel: true } });
    } else {
      this.router.transitionTo(currentRoute, this.args.event, { queryParams: { video_dialog: true } });
    }
  }
}
