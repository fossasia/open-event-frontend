import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({
  code          : attr('string'),
  accessUrl     : attr('string'),
  isActive      : attr('boolean', { defaultValue: false }),
  ticketsNumber : attr('number'),
  minQuantity   : attr('number'),
  maxQuantity   : attr('number'),
  validFrom     : attr('moment'),
  validTill     : attr('moment'),

  tickets  : hasMany('ticket'),
  marketer : belongsTo('user', { inverse: 'accessCodes' }),
  event    : belongsTo('event', {
    inverse: 'accessCodes'
  }), // The event that this access code belongs to

  /**
   * Computed properties
   */

  validFromDate : computedDateTimeSplit.bind(this)('validFrom', 'date'),
  validFromTime : computedDateTimeSplit.bind(this)('validFrom', 'time'),
  validTillDate : computedDateTimeSplit.bind(this)('validTill', 'date'),
  validTillTime : computedDateTimeSplit.bind(this)('validTill', 'time')
});
