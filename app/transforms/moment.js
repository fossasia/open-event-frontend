import Transform from 'ember-data/transform';
import moment from 'moment';

export default Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return null;
    }
    return moment(serialized);
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    }
    return moment(deserialized).toISOString();
  }
});
