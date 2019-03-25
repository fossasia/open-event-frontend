import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  firstName : attr('string'),
  lastName  : attr('string'),
  email     : attr('string'),
  sales     : attr()
});
