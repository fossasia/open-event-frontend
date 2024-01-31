import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  name           : attr('string'),
  description    : attr('string'),
  unverifiedUser : attr('boolean'),
  anonymousUser  : attr('boolean')
});
