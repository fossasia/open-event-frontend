import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import moment from 'moment-timezone';
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
  minPrice             : attr('number', { defaultValue: 1 }),
  maxPrice             : attr('number'),
  isFeeAbsorbed        : attr('boolean', { defaultValue: true }),
  position             : attr('number'),
  formID               : attr('string', { defaultValue: '' }),
  badgeID              : attr('string', { defaultValue: '' }),
  hasOrders            : false,

  /**
   * Relationships
   */
  event            : belongsTo('event'),
  orders           : hasMany('order'),
  attendees        : hasMany('attendee'),
  orderStatistics  : belongsTo('order-statistics-ticket'),
  /**
   * Computed properties
   */
  salesStartAtDate : computedDateTimeSplit.bind(this)('salesStartsAt', 'date', 'salesEndsAt'),
  salesStartAtTime : computedDateTimeSplit.bind(this)('salesStartsAt', 'time', 'salesEndsAt'),
  salesEndsAtDate  : computedDateTimeSplit.bind(this)('salesEndsAt', 'date'),
  salesEndsAtTime  : computedDateTimeSplit.bind(this)('salesEndsAt', 'time'),

  itemTotal: computed('price', 'quantity', function() {
    return this.price * this.quantity;
  }),

  /**
   * This attribute computes total ticket price payable after inclusion
   * of additional taxes on the base ticket price
   */
  ticketPriceWithTax: computed('price', 'event.tax.isTaxIncludedInPrice', 'event.tax.rate', function() {
    const taxType = this.event.get('tax.isTaxIncludedInPrice');
    if (!taxType) {
      return ((1 + this.event.get('tax.rate') / 100) * this.price).toFixed(2);
    }
    return this.price;
  }),

  /**
   * This attribute computes value added tax amount in the cases
   * when tax amount is included in ticket price, otherwise return
   * 0
   */
  includedTaxAmount: computed('price', 'event.tax.isTaxIncludedInPrice', 'event.tax.rate', function() {
    const taxType = this.event.get('tax.isTaxIncludedInPrice');
    if (taxType) {
      const taxRate = this.event.get('tax.rate');
      return ((taxRate * this.price) / (100 + taxRate)).toFixed(2);
    }
    return 0;
  })
});
