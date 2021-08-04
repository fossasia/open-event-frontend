import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { getRandomColor } from 'open-event-frontend/utils/color';

export default ModelBase.extend({
  name        : attr('string'),
  color       : attr('string', { defaultValue: () => getRandomColor() }),
  description : attr('string'),
  fontColor   : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
