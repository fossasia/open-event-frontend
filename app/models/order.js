import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';

export default ModelBase.extend(CustomPrimaryKeyMixin, {
  /**
   * attributes
   */
  amount           : attr('number'),
  company          : attr('string'),
  taxBusinessInfo  : attr('string'),
  address          : attr('string'),
  city             : attr('string'),
  state            : attr('string'),
  country          : attr('string'),
  zipcode          : attr('string'),
  paymentMode      : attr('string', { defaultValue: 'free' }),
  status           : attr('string', { defaultValue: 'initializing' }),
  transactionId    : attr('string', { readOnly: true }),
  expMonth         : attr('string'),
  expYear          : attr('string'),
  identifier       : attr('string', { readOnly: true }),
  brand            : attr('string'),
  last4            : attr('string'),
  paidVia          : attr('string'),
  isBillingEnabled : attr('boolean', { defaultValue: false }),
  createdAt        : attr('moment', { readOnly: true }),
  completedAt      : attr('moment', { readOnly: true }),
  discountCodeId   : attr('string', { readOnly: true }),
  ticketsPdfUrl    : attr('string'),
  /**
   * Relationships
   */
  user             : belongsTo('user'),
  event            : belongsTo('event'),
  discountCode     : belongsTo('discount-code'),
  accessCode       : belongsTo('access-code'),
  tickets          : hasMany('ticket', { readOnly: true }),
  attendees        : hasMany('attendee'),

  includedTaxAmount: computed('amount', 'event.isTaxEnabled', 'event.tax.rate', function() {
    const isTaxEnabled = this.event.get('isTaxEnabled');
    const taxRate = this.event.get('tax.rate');
    if (isTaxEnabled) {
      return ((taxRate * this.amount) / (100 + taxRate));
    } else {
      return 0;
    }
  })
});
