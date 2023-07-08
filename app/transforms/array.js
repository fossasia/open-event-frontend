import Transform from 'ember-data/transform';
// import moment from 'moment';

export default Transform.extend({
  deserialize(serialized) {
    if (!serialized) {
      return null;
    }
    // return moment(serialized);
    return JSON.parse(serialized);
  },

  serialize(deserialized) {
    if (!deserialized) {
      return null;
    }
    return JSON.stringify(deserialized);
  }
});
