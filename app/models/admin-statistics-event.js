import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  draft     : attr('number'),
  published : attr('number'),
  past      : attr('number')
});
