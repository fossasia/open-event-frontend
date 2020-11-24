import Route from '@ember/routing/route';
import VideoStream from 'open-event-frontend/models/video-stream';

export default class PublicStreamView extends Route {
  titleToken(model: VideoStream): string {
    return model.name;
  }

  model(params: { stream_id: number }): VideoStream {
    return this.store.findRecord('video-stream', params.stream_id);
  }
}
