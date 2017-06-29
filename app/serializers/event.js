import ApplicationSerializer from 'open-event-frontend/serializers/application';

export default ApplicationSerializer.extend({
  primaryKey : 'identifier',
  attrs      : {
    type             : 'eventType',
    topic            : 'eventTopic',
    subTopic         : 'eventSubTopic',
    copyright        : 'eventCopyright',
    externalEventUrl : 'eventUrl'
  }
});
