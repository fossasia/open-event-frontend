import Mixin from '@ember/object/mixin';
import { get, unset } from 'lodash-es';
import { coerceId } from 'open-event-frontend/utils/internal';
import attr from 'ember-data/attr';

export default Mixin.create({

  originalId: attr(),

  extractId(modelClass, resourceHash) {
    let primaryKey = this.get('primaryKey');
    let id = get(resourceHash, primaryKey);
    return coerceId(id);
  },

  serialize() {
    let primaryKey = this.get('primaryKey');
    const json = this._super(...arguments);
    if (primaryKey !== 'id') {
      unset(json, ['data', primaryKey]); // Remove the custom primary key
      json.data.id = json.data.attributes['original-id']; // Restore the original from copy
      unset(json, 'data.attributes.original-id'); // Remove the original's copy
    }
    return json;
  },

  extractAttributes(modelClass, resourceHash) {
    let primaryKey = this.get('primaryKey');
    let attributes = this._super(...arguments);
    if (primaryKey !== 'id') {
      attributes.originalId = resourceHash.id;
    }
    return attributes;
  }
});
