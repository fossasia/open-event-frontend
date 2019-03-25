import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  name            : attr('string'),
  endsAt          : attr('moment'),
  startsAt        : attr('moment'),
  paymentCurrency : attr('string'),
  sales           : attr()
});
