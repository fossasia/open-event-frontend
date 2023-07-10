import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment-timezone';
import { belongsTo } from 'ember-data/relationships';

const detectedTimezone = moment.tz.guess();

export default ModelBase.extend({
  email     : attr('string'),
  hash      : attr('string'),
  status    : attr('string', { defaultValue: 'pending' }),
  createdAt : attr('moment', { defaultValue: () => moment.tz(detectedTimezone) }),
  roleName  : attr('string'),
  event     : belongsTo('event'),
  role      : belongsTo('role')
});
