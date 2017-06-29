import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { getColor } from 'open-event-frontend/utils/colors';

export default Model.extend({
  name        : attr('string'),
  color       : attr('string', { defaultValue: () => getColor() }),
  description : attr('string'),
  fontColor   : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
