import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  donationInclude : attr('boolean'),
  ticketInclude   : attr('boolean'),
  paymentInclude  : attr('boolean')
});
