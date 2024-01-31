import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import moment from 'moment-timezone';

const detectedTimezone = moment.tz.guess();

export default ModelBase.extend({
  announcement : attr('string'),
  startsAt     : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).subtract(3, 'days').startOf('day') }),
  softEndsAt   : attr('moment', { defaultValue: () => null }),
  endsAt       : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).subtract(2, 'days').startOf('day') }),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startsAtDate   : computedDateTimeSplit.bind(this)('startsAt', 'date', 'endsAt'),
  startsAtTime   : computedDateTimeSplit.bind(this)('startsAt', 'time', 'endsAt'),
  softEndsAtDate : computedDateTimeSplit.bind(this)('softEndsAt', 'date'),
  softEndsAtTime : computedDateTimeSplit.bind(this)('softEndsAt', 'time'),
  endsAtDate     : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime     : computedDateTimeSplit.bind(this)('endsAt', 'time'),

  isOpen: computed('startsAt', 'endsAt', function() {
    return moment().isAfter(this.startsAt) && moment().isBefore(this.endsAt);
  }),

  isInFuture: computed('startsAt', function() {
    return moment(this.startsAt).isAfter();
  })
});
