import attr from 'ember-data/attr';
import moment from 'moment-timezone';
import ModelBase from 'open-event-frontend/models/base';

const detectedTimezone = moment.tz.guess();

export default ModelBase.extend({
  actor  : attr('string'),
  time   : attr('moment', { defaultValue: () => moment.tz(detectedTimezone) }),
  action : attr('string')
});
