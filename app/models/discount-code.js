import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';

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
  type          : attr('string'),
  value         : attr('number'),
  ticketsNumber : attr('number'), // For form (1) this holds the max. times this can be used for events
  minQuantity   : attr('number'), // Not of any significance for form (1)
  maxQuantity   : attr('number'), // For form (1) this holds the number of months this code is valid for events
  validFrom     : attr('moment'),
  discountUrl   : attr('string'),
  validTill     : attr('moment'),
  usedFor       : attr('string'),
  isActive      : attr('boolean', { defaultValue: true }),
  createdAt     : attr('moment'),

  tickets : hasMany('ticket'),
  orders  : hasMany('order'),
  event   : belongsTo('event', {
    inverse: 'discountCodes'
  }), // The event that this discount code belongs to [Form (2)]
  events: hasMany('event', {
    inverse: 'discountCode'
  })    // The events that this discount code has been applied to [Form (1)]
});

