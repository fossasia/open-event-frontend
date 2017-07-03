import Ember from 'ember';
import { get } from 'lodash';
import { coerceId } from 'open-event-frontend/utils/internal';
import attr from 'ember-data/attr';

const { Mixin } = Ember;

export default Mixin.create({

  originalId: attr(),

  extractId(modelClass, resourceHash) {
    let primaryKey = this.get('primaryKey');
    let id = get(resourceHash, primaryKey);
    return coerceId(id);
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
