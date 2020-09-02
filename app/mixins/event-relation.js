import Mixin from '@ember/object/mixin';

/**
 * A mixin that will replace event identifier with the event's original id while saving relationships
 */
export default Mixin.create({

  serializeBelongsTo(snapshot, json, relationship) {
    try {
      if (snapshot.belongsTo('event')) {
        snapshot.belongsTo('event').id = snapshot.belongsTo('event').attributes().originalId;
      }
    } catch (ignored) { /** ignore errors as some models won't be having event relationship **/ }

    return this._super(snapshot, json, relationship);
  },

  serializeHasMany(snapshot, json, relationship) {
    try {
      if (snapshot.hasMany('events') && snapshot.hasMany('events').length > 0) {
        for (let i = 0; i < snapshot.hasMany('events').length; i++) {
          snapshot.hasMany('events')[i].id = snapshot.hasMany('events')[i].attributes().originalId;
        }
      }
    } catch (ignored) { /** ignore errors as some models won't be having event relationship **/ }

    return this._super(snapshot, json, relationship);
  }
});
