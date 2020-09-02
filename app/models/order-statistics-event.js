import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  identifier : attr('string'),
  orders     : attr(),
  tickets    : attr(),
  sales      : attr()
});
