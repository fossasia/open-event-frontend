import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment';
import { computedDateTimeSplit } from 'open-event-frontend/utils/computed-helpers';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({

  /**
   * Attributes
   */
  name                 : attr('string'),
  type                 : attr('string'),
  price                : attr('number'),
  quantity             : attr('number'),
  description          : attr('string'),
  isDescriptionVisible : attr('boolean', { defaultValue: true }),
  isHidden             : attr('boolean', { defaultValue: false }),
  salesStartsAt        : attr('moment', { defaultValue: () => moment().startOf('day') }),
  salesEndsAt          : attr('moment', { defaultValue: () => moment().add(10, 'days').startOf('day') }),
  minOrder             : attr('number', { defaultValue: 1 }),
  maxOrder             : attr('number', { defaultValue: 10 }),
  isFeeAbsorbed        : attr('boolean', { defaultValue: true }),
  position             : attr('number'),

  hasOrders: false,

  /**
   * Relationships
   */
  event           : belongsTo('event'),
  orders          : hasMany('order'),
  attendees       : hasMany('attendee'),
  orderStatistics : belongsTo('order-statistics-ticket'),

  /**
   * Computed properties
   */
  salesStartAtDate : computedDateTimeSplit.bind(this)('salesStartsAt', 'date'),
  salesStartAtTime : computedDateTimeSplit.bind(this)('salesStartsAt', 'time'),
  salesEndsAtDate  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date'),
  salesEndsAtTime  : computedDateTimeSplit.bind(this)('salesEndsAt', 'time'),

  itemTotal: computed('price', 'quantity', function() {
    return this.price * this.quantity;
  }),

  taxedAmount: computed('event.tax', function() {
    let taxType = this.event.get('tax.isTaxIncludedInPrice');
    if (!taxType) {
      return (1 + this.event.get('tax.rate')/100)*this.price;
    }
    return this.price;
  })
});
