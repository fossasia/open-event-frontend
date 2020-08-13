import Mixin from '@ember/object/mixin';
import { get, unset } from 'lodash-es';
import { coerceId } from 'open-event-frontend/utils/internal';
import attr from 'ember-data/attr';

export default Mixin.create({

  originalId: attr(),

  extractId(modelClass, resourceHash) {
    const id = get(resourceHash, this.primaryKey);
    return coerceId(id);
  },

  serialize() {
    const json = this._super(...arguments);
    if (this.primaryKey !== 'id') {
      unset(json, ['data', this.primaryKey]); // Remove the custom primary key
      json.data.id = json.data.attributes['original-id']; // Restore the original from copy
      unset(json, 'data.attributes.original-id'); // Remove the original's copy
    }
    return json;
  },

  extractAttributes(modelClass, resourceHash) {
    const attributes = this._super(...arguments);
    if (this.primaryKey !== 'id') {
      attributes.originalId = resourceHash.id;
    }
    return attributes;
  }
});
