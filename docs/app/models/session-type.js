import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  name     : attr('string'),
  length   : attr('string', { defaultValue: '00:30' }),
  position : attr('number', { defaultValue: 0 }),

  event    : belongsTo('event'),
  sessions : hasMany('session')
});
