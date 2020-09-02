import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  code            : attr('string'),
  email           : attr('string'),
  eventName       : attr('string'),
  paymentCurrency : attr('string'),
  sales           : attr()
});
