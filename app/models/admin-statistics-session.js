import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  confirmed : attr('number'),
  accepted  : attr('number'),
  submitted : attr('number'),
  draft     : attr('number'),
  rejected  : attr('number'),
  pending   : attr('number')
});
