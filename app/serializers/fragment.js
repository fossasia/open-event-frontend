import Ember from 'ember';
import JSONSerializer from 'ember-data/serializers/json';

const { String: { underscore } } = Ember;

export default JSONSerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  },

  keyForRelationship(rawKey) {
    return underscore(rawKey);
  }
});
