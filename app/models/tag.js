import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  /**
   * Attributes
   */
  name       : attr('string'),
  color      : attr('string'),
  isReadOnly : attr('boolean', { defaultValue: false }),
  /**
   * Relationships
   */
  event      : belongsTo('event')
});
