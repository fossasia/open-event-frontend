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
    // We are deleting read only relationships so that they don't
    // break the server. Since these relationships are not always
    // present, we catch and ignore the error
    try {
      delete relationships['general-statistics'];
    } catch {} // eslint-disable-line no-empty
    try {
      delete relationships['order-statistics'];
    } catch {} // eslint-disable-line no-empty

    return json;

  }

});
