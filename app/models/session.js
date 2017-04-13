import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  title         : attr('string'),
  subtitle      : attr('string'),
  startDateTime : attr('date'),
  endDateTime   : attr('date'),
  shortAbstract : attr('string'),
  longAbstract  : attr('string'),
  language      : attr('string'),
  level         : attr('string'),
  comments      : attr('string'),
  slides        : attr('string'),
  state         : attr('string'),
  video         : attr('string'),
  audio         : attr('string'),
  signupUrl     : attr('string'),

  session_type  : belongsTo('session-type'),
  microlocation : belongsTo('microlocation'),
  track         : belongsTo('track'),
  speakers      : hasMany('speaker')
});
