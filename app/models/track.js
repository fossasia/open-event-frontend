import DS from 'ember-data';
import { getColor } from 'open-event-frontend/utils/colors';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name        : attr('string'),
  color       : attr('string', { defaultValue: () => getColor() }),
  description : attr('string'),
  imageUrl    : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
