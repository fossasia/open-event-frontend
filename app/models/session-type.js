import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  name   : attr('string'),
  length : attr('attr'),

  event    : belongsTo('event'),
  sessions : hasMany('session')
});
