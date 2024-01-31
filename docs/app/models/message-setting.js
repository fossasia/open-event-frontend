import ModelBase from 'open-event-frontend/models/base';
import attr from 'ember-data/attr';

export default ModelBase.extend({

  /**
   * Attributes
   */
  action       : attr('string'),
  enabled      : attr('boolean'),
  emailMessage : attr('string'),
  recipient    : attr('string'),
  emailSubject : attr('string')
});
