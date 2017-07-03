import ApplicationSerializer from 'open-event-frontend/serializers/application';
import { pick } from 'lodash';

export default ApplicationSerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);
    if (options.includeId) {
      json.data.attributes = pick(json.data.attributes, ['email', 'password']);
    }
    return json;
  }
});
