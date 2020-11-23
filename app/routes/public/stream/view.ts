import Route from '@ember/routing/route';
import VideoStream from 'open-event-frontend/models/video-stream';

export default class PublicStreamView extends Route {
  titleToken(model: VideoStream) {
    return model.name;
  }

  model(params: { stream_id: number }) {
    return this.store.findRecord('video-stream', params.stream_id);
  }
}
