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

    const { relationships } = json.data;
    try {
      delete relationships['general-statistics'];
    } catch {} // eslint-disable-line no-empty
    try {
      delete relationships['order-statistics'];
    } catch {} // eslint-disable-line no-empty

    return json;

  }

});
