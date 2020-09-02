import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  fullname : attr('string'),
  email    : attr('string'),
  sales    : attr()
});
