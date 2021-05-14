import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  title      : attr('string'),
  message    : attr('string'),
  isRead     : attr('boolean', { defaultValue: false }),
  receivedAt : attr('moment'),

  /*
  * Relationships
  */
  user: belongsTo('user')
});
