import Mixin from '@ember/object/mixin';

/**
 * A mixin that will replace event identifier with the event's original id while saving relationships
 */
export default Mixin.create({

  serializeBelongsTo(snapshot, json, relationship) {
    try {
      const event = snapshot.belongsTo('event');
      if (event) {
        const { originalId } = event.attributes();
        // ID may have been already replaced and originalId may be undefined
        // Overriding valid ID with undefined
        if (originalId) {
          event.id = originalId;
        }
      }
    } catch (ignored) { /** ignore errors as some models won't be having event relationship **/ }

    return this._super(snapshot, json, relationship);
  },

  serializeHasMany(snapshot, json, relationship) {
    try {
      if (snapshot.hasMany('events') && snapshot.hasMany('events').length > 0) {
        for (let i = 0; i < snapshot.hasMany('events').length; i++) {
          const event = snapshot.hasMany('events')[i];
          const { originalId } = event.attributes();
          if (originalId) {
            event.id = originalId;
          }
        }
      }
    } catch (ignored) { /** ignore errors as some models won't be having event relationship **/ }

    return this._super(snapshot, json, relationship);
  }
});
