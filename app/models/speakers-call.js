import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const detectedTimezone = dayjs.tz.guess();

export default ModelBase.extend({
  announcement : attr('string'),
  startsAt     : attr('dayjs', { defaultValue: () => dayjs.tz(detectedTimezone).subtract(3, 'day').startOf('day') }),
  endsAt       : attr('dayjs', { defaultValue: () => dayjs.tz(detectedTimezone).subtract(2, 'day').startOf('day') }),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date', 'endsAt'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time', 'endsAt'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'time'),

  isOpen: computed('startsAt', 'endsAt', function() {
    return dayjs().isAfter(this.startsAt) && dayjs().isBefore(this.endsAt);
  }),

  isInFuture: computed('startsAt', function() {
    return dayjs(this.startsAt).isAfter();
  })
});
