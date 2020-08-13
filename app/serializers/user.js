import ApplicationSerializer from 'open-event-frontend/serializers/application';
import { pick, omit } from 'lodash-es';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);
    if (snapshot.id) {
      const attributesToOmit = [];
      if (!snapshot.adapterOptions || !snapshot.adapterOptions.includePassword) {
        attributesToOmit.push('password');
      }
      json.data.attributes = omit(json.data.attributes, attributesToOmit);
    } else if (options && options.includeId) {
      json.data.attributes = pick(json.data.attributes, ['email', 'password', 'was-registered-with-order']);
    }
    return json;
  }
});
