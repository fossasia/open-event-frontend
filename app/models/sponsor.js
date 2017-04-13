import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name        : attr('string'),
  level       : attr('number'),
  type        : attr('string'),
  url         : attr('string'),
  description : attr('string'),
  logoUrl     : attr('string'),

  event: belongsTo('event')
});
