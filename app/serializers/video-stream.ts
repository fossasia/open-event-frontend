import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default class VideoStreamSerializer extends ApplicationSerializer {
  attrs = {
    rooms : { serialize: true },
    event : { serialize: true }
  }

  serialize(): any {
    const json = super.serialize(...arguments);

    const { relationships } = json.data;
    if (relationships.rooms?.data?.length === 0) {
      // If object is empty, remove it so that validations on server aren't triggered
      try {
        delete relationships.rooms;
      } catch {} // eslint-disable-line no-empty
    }

    return json;
  }
}
