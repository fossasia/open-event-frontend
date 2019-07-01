import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  rating    : attr('number', { defaultValue: 0.0 }),
  comment   : attr('string'),
  deletedAt : attr('moment'),

  user    : belongsTo('user'),
  event   : belongsTo('event'),
  session : belongsTo('session')
});
