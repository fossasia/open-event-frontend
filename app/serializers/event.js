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

  serialize() {
    const json = this._super(...arguments);
    delete json.data.relationships['general-statistics'];
    delete json.data.relationships['order-statistics'];

    return json;
  }

});
