import ModelBase from 'open-event-frontend/models/base';
import attr from 'ember-data/attr';

export default ModelBase.extend({

  /**
   * Attributes
   */
  action              : attr('string'),
  mailStatus          : attr('boolean'),
  notificationStatus  : attr('boolean'),
  userControlStatus   : attr('boolean'),
  emailMessage        : attr('string'),
  recipient           : attr('string'),
  emailSubject        : attr('string'),
  notificationTitle   : attr('string'),
  notificationMessage : attr('string'),
  sentAt              : attr('string'),
  threshold           : attr('number')
});
