import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default ModelBase.extend({
  amount         : attr('string'),
  address        : attr('string'),
  city           : attr('string'),
  state          : attr('string'),
  country        : attr('string'),
  zipcode        : attr('string'),
  paymentMode    : attr('string'),
  status         : attr('string'),
  discountCodeId : attr('string'),
  user           : belongsTo('user'),
  event          : belongsTo('event'),
  discountCode   : belongsTo('discount-code'),
  tickets        : hasMany('ticket')
});
