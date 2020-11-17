import attr from 'ember-data/attr';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import ModelBase from 'open-event-frontend/models/base';

const detectedTimezone = dayjs.tz.guess();

export default ModelBase.extend({
  actor  : attr('string'),
  time   : attr('dayjs', { defaultValue: () => dayjs.tz(detectedTimezone) }),
  action : attr('string')
});
