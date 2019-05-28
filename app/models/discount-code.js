import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

const detectedTimezone = moment.tz.guess();

/**
 * Two different forms of discount code can exist. (Both use the same model)
 *
 * 1. Created by the super admin and can be applied to whole events when creating an event.
 *    (this discount is on the total ticket fees that goes to eventyay)
 *
 * 2. Created by an event's organizer to be used on that event's tickets
 */
export default ModelBase.extend({
  code          : attr('string'),
  type          : attr('string', { defaultValue: 'amount' }),
  value         : attr('number'),
  ticketsNumber : attr('number'), // For form (1) this holds the max. times this can be used for events
  minQuantity   : attr('number', { defaultValue: 0 }), // Not of any significance for form (1)
  maxQuantity   : attr('number'), // For form (1) this holds the number of months this code is valid for events
  validFrom     : attr('moment'),
  discountUrl   : attr('string'),
  validTill     : attr('moment', { defaultValue: () => moment.tz(detectedTimezone).add(1, 'months').startOf('day') }),
  usedFor       : attr('string'),
  isActive      : attr('boolean', { defaultValue: true }),
  createdAt     : attr('moment'),

  tickets   : hasMany('ticket'),
  orders    : hasMany('order'),
  isExpired : computed('validTill', function() {
    return new Date() > new Date(this.validTill);
  }),
  event: belongsTo('event', {
    inverse: 'discountCodes'
  }), // The event that this discount code belongs to [Form (2)]
  events: hasMany('event', {
    inverse: 'discountCode'
  }), // The events that this discount code has been applied to [Form (1)]
  marketer: belongsTo('user'),

  validFromDate : computedDateTimeSplit.bind(this)('validFrom', 'date'),
  validFromTime : computedDateTimeSplit.bind(this)('validFrom', 'time'),
  validTillDate : computedDateTimeSplit.bind(this)('validTill', 'date'),
  validTillTime : computedDateTimeSplit.bind(this)('validTill', 'time')
});
