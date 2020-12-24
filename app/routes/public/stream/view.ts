import Route from '@ember/routing/route';
import VideoStream from 'open-event-frontend/models/video-stream';
import { hash } from 'rsvp';

export default class PublicStreamView extends Route {

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

  model(params: { stream_id: number }): Promise<any> {
    const event = this.modelFor('public');
    return hash({
      event,
      stream: this.store.findRecord('video-stream', params.stream_id, { include: 'video-channel', reload: true })
    });
  }
}
