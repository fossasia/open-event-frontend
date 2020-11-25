import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default class VideoStreamSerializer extends ApplicationSerializer {
  attrs = {
    rooms: { serialize: true }
  }
}
