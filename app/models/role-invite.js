import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { belongsTo } from 'ember-data/relationships';

const detectedTimezone = dayjs.tz.guess();

export default ModelBase.extend({
  email     : attr('string'),
  hash      : attr('string'),
  status    : attr('string', { defaultValue: 'pending' }),
  createdAt : attr('dayjs', { defaultValue: () => dayjs.tz(detectedTimezone) }),
  roleName  : attr('string'),
  event     : belongsTo('event'),
  role      : belongsTo('role')
});
