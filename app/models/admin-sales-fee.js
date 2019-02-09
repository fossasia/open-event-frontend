import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  name            : attr('string'),
  paymentCurrency : attr('string'),
  feePercentage   : attr('number'),
  revenue         : attr('number'),
  ticketCount     : attr('number')
});
