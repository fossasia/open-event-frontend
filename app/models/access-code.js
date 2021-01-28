import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({
  code          : attr('string'),
  accessUrl     : attr('string'),
  isActive      : attr('boolean', { defaultValue: true }),
  ticketsNumber : attr('number', { defaultValue: 10 }),
  minQuantity   : attr('number', { defaultValue: 0 }),
  maxQuantity   : attr('number', { defaultValue: 10000 }),
  validFrom     : attr('moment'),
  validTill     : attr('moment'),

  tickets  : hasMany('ticket'),
  marketer : belongsTo('user', { inverse: 'accessCodes' }),
  event    : belongsTo('event', {
    inverse: 'accessCodes'
  }), // The event that this access code belongs to
  orders: hasMany('order'),

  /**
   * Computed properties
   */
  isExpired: computed('validTill', 'event', function() {
    return new Date(this.validTill) ? new Date() > new Date(this.validTill) : new Date() > this.event.get('endsAt');
  }),

  validFromDate : computedDateTimeSplit.bind(this)('validFrom', 'date', 'validTill'),
  validFromTime : computedDateTimeSplit.bind(this)('validFrom', 'time', 'validTill'),
  validTillDate : computedDateTimeSplit.bind(this)('validTill', 'date'),
  validTillTime : computedDateTimeSplit.bind(this)('validTill', 'time')
});
