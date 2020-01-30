import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  primaryKey : 'attributes.identifier',
  attrs      : {
    type      : 'event-type',
    topic     : 'event-topic',
    subTopic  : 'event-sub-topic',
    copyright : 'event-copyright'
  },
  normalize() {
    const payload = this._super(...arguments);
    payload.data = this.addLinks(payload.data);
    return payload;
  },

  addLinks(event) {
    event.relationships.eventStatisticsGeneral = {
      links: {
        related : `/v1/events/${event.id}/general-statistics`,
        self    : `/v1/events/${event.id}/general-statistics`
      }
    };
    return event;
  }

});

