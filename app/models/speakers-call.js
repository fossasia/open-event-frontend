import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { v4 } from 'ember-uuid';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import moment from 'moment';

const detectedTimezone = moment.tz.guess();

export default ModelBase.extend({
  announcement : attr('string'),
  startsAt     : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').startOf('day') }),
  endsAt       : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').hour(17).minute(0) }),
  privacy      : attr('string', { defaultValue: 'public' }),
  hash         : attr('string', { defaultValue: v4() }),

  event: belongsTo('event'),

  startsAtDate : computedDateTimeSplit.bind(this)('startsAt', 'date'),
  startsAtTime : computedDateTimeSplit.bind(this)('startsAt', 'time'),
  endsAtDate   : computedDateTimeSplit.bind(this)('endsAt', 'date'),
  endsAtTime   : computedDateTimeSplit.bind(this)('endsAt', 'time'),

  isOpen: computed('startsAt', 'endsAt', function() {
    return moment().isAfter(this.startsAt) && moment().isBefore(this.endsAt);
  }),

  isInFuture: computed('startsAt', function() {
    return moment(this.startsAt).isAfter();
  })
});
