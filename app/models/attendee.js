import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import ModelBase from 'open-event-frontend/models/base';
import { computed } from '@ember/object';

export default ModelBase.extend({

  /**
   * Attributes
   */
  city            : attr('string'),
  firstname       : attr('string'),
  lastname        : attr('string'),
  isCheckedIn     : attr('boolean', { defaultValue: false }),
  checkinTimes    : attr('string'),
  state           : attr('string'),
  address         : attr('string'),
  pdfUrl          : attr('string'),
  country         : attr('string'),
  email           : attr('string'),
  jobTitle        : attr('string'),
  phone           : attr('string'),
  company         : attr('string'),
  taxBusinessInfo : attr('string'),
  billingAddress  : attr('string'),
  homeAddress     : attr('string'),
  shippingAddress : attr('string'),
  workAddress     : attr('string'),
  workPhone       : attr('string'),
  website         : attr('string'),
  blog            : attr('string'),
  twitter         : attr('string'),
  facebook        : attr('string'),
  github          : attr('string'),
  gender          : attr('string'),
  birthDate       : attr('moment'),

  /**
   * Relationships
   */
  event  : belongsTo('event'),
  order  : belongsTo('order'),
  ticket : belongsTo('ticket'),
  user   : belongsTo('user'),

  ticketPrice: computed('ticket.price', 'ticket.discountCodes', 'order.discountCode', function() {
    let orderDiscountCode = this.order.get('discountCode');
    let price = this.ticket.get('price');
    if (price && orderDiscountCode) {
      let ticketDiscountCodes = this.ticket.get('discountCodes');
      if (ticketDiscountCodes) {
        ticketDiscountCodes.forEach(discountCode => {
          if (discountCode.get('id') === orderDiscountCode.get('id')) {
            if (discountCode.get('type') === 'amount') {
              return (price - discountCode.get('amount'));
            } else {
              return ((price * (100 - discountCode.get('value'))) / 100).toFixed(2);
            }
          }
        });
      }
    }
    return price;
  })
});
