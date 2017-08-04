import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */

  nextEvent           : attr('boolean'),
  newPaper            : attr('boolean'),
  sessionAcceptReject : attr('boolean'),
  sessionSchedule     : attr('boolean'),
  afterTicketPurchase : attr('boolean'),

  /**
   * Relationships
   */
  user  : belongsTo('user'),
  event : belongsTo('event')
});
