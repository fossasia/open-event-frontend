import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default ModelBase.extend({
  email    : attr('string'),
  accepted : attr('boolean'),
  token    : attr('string'),
  group    : belongsTo('group'),
  role     : belongsTo('role'),
  user     : belongsTo('user')
});
