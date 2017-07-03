import JSONAPISerializer from 'ember-data/serializers/json-api';
import DS from 'ember-data';
const { normalizeModelName } = DS;
import { singularize } from 'ember-inflector';

export default JSONAPISerializer.extend({
  modelNameFromPayloadKey(key) {
    return singularize(normalizeModelName(key));
  },

  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  },

  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options && attribute.options.readOnly) {
      return;
    }
    this._super(...arguments);
  }
});
