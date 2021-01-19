import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';


export default ModelBase.extend({

  name:  attr('string'),
  createdAt : attr('moment', { readOnly: true }),
  modifiedAt : attr('moment'),
  /**
   * Relationships
   */
  user                : belongsTo('user'),
});
