import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { getColor } from 'open-event-frontend/utils/colors';

export default ModelBase.extend({
  name        : attr('string'),
  color       : attr('string', { defaultValue: () => getColor() }),
  description : attr('string'),
  fontColor   : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
