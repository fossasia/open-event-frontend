import JSONAPISerializer from 'ember-data/serializers/json-api';
import DS from 'ember-data';
const { normalizeModelName } = DS;
import { singularize } from 'ember-inflector';
import EventRelationMixin  from 'open-event-frontend/mixins/event-relation';

export default JSONAPISerializer.extend(EventRelationMixin, {
  modelNameFromPayloadKey(key) {
    return singularize(normalizeModelName(key));
  },

  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  },

  serializeAttribute(snapshot, json, key, attribute) {
    if (attribute.options?.readOnly && !this._options?.includeReadOnly) {
      return;
    }
    this._super(...arguments);
  },

  serializeHasMany(snapshot, json, relationship) {
    if (!snapshot.hasMany(relationship.key) || (snapshot.hasMany(relationship.key) && relationship.options.readOnly)) {
      return;
    }
    this._super(...arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    if (!snapshot.belongsTo(relationship.key) || (snapshot.belongsTo(relationship.key) && !snapshot.belongsTo(relationship.key).id)) {
      return;
    }
    this._super(...arguments);
  },

  serialize(snapshot, options) {
    this._options = options;
    return this._super(...arguments);
  }
});
