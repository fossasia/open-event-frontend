import Transform from 'ember-data/transform';
import dayjs from 'dayjs';

export default Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return null;
    }
    return dayjs(serialized);
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    }
    return dayjs(deserialized).toISOString();
  }
});
