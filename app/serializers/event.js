import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    type             : 'event-type',
    topic            : 'event-topic',
    subTopic         : 'event-sub-topic',
    copyright        : 'event-copyright',
    externalEventUrl : 'event-url'
  }
});
