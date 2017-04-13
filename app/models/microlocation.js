import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name      : attr('string'),
  floor     : attr('number'),
  latitude  : attr('number'),
  longitude : attr('number'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
