import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  country    : attr('string'),
  currency   : attr('string'),
  serviceFee : attr('number'),
  maximumFee : attr('number')
});
