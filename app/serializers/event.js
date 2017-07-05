import ApplicationSerializer from 'open-event-frontend/serializers/application';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ApplicationSerializer.extend(CustomPrimaryKeyMixin, {

  primaryKey : 'attributes.identifier',
  attrs      : {
    typev     : 'event-type',
    topic     : 'event-topic',
    subTopic  : 'event-sub-topic',
    copyright : 'event-copyright'
  }
});
