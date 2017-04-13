import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name        : attr('string'),
  color       : attr('string', { defaultValue: () => palette.random('800') }),
  description : attr('string'),
  imageUrl    : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
