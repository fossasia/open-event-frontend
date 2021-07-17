import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  groups      : attr('number'),
  followers   : attr('number'),
  groupEvents : attr('number')
});
