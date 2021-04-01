import Route from '@ember/routing/route';
import VideoStream from 'open-event-frontend/models/video-stream';
import { hash } from 'rsvp';
import { action }  from '@ember/object';
import { inject as service } from '@ember/service'
import Loader from 'open-event-frontend/services/loader';
import Event from 'open-event-frontend/models/event';


export default class PublicStreamView extends Route {
  @service declare loader: Loader;

  renderTemplate(): void {
    this.render('public/stream/view', { into: 'root' });
  }

  titleToken(model: { stream: VideoStream}): string {
    setTimeout(() => {
      if (window?.document) {
        window.document.title = model.stream.name;
      }
    }, 0);
    return model.stream.name;
  }

  async model(params: { stream_id: number, success: boolean, token: string }): Promise<any> {
    const event = this.modelFor('public') as Event;
    const { success, token } = await this.loader.load(`/events/${event.id}/chat-token`);

    return hash({
      event,
      stream: this.store.findRecord('video-stream', params.stream_id, { include: 'video-channel', reload: true }),
      success,
      token
    });
  }

  @action
  error(error: {isAdapterError: boolean, errors: any[]}, transition: any): void | boolean { // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    if (error.isAdapterError && error.errors?.[0]?.status === 404) {
      this.transitionTo('public', transition.resolvedModels.public, { queryParams: { video_dialog: true } });
    } else {
      return true;
    }
  }
}
