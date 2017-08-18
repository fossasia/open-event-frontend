import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  name        : attr('string'),
  title       : attr('string'),
  url         : attr('string'),
  description : attr('string'),
  language    : attr('string'),
  index       : attr('number', { defaultValue: 0 }),
  place       : attr('string')
});
