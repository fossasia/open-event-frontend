import Transform from 'ember-data/transform';
import moment from 'moment';

export default Transform.extend({
  deserialize(serialized) {
    return moment(serialized);
  },

  serialize(deserialized) {
    return moment(deserialized).toISOString();
  }
});
