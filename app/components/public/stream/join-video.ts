import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import VideoStream from 'open-event-frontend/models/video-stream';
import Event from 'open-event-frontend/models/event';
import Loader from 'open-event-frontend/services/loader';
import { action } from '@ember/object';
import EventService from 'open-event-frontend/services/event';

interface Args {
  videoStream: VideoStream;
  event: Event;
  hasStreams: boolean;
  canAccess: boolean;
  showSidePanel: () => void
}

export default class JoinVideo extends Component<Args> {
  @service router: any;
  @service loader!: Loader;
  @service confirm: any;
  @service l10n: any;
  @service session : any;
  @service declare event: EventService;

  @action
  openPanel(): void {
    if (this.args.canAccess) {
      this.args.showSidePanel?.();
      this.router.transitionTo({ queryParams: { side_panel: true } });
    } else {
      if (this.session.isAuthenticated) {
        this.router.transitionTo('public', this.args.event, { queryParams: { video_dialog: true } });
      } else {
        this.router.transitionTo({ queryParams: { video_dialog: true } });
      }
    }
  }
}
