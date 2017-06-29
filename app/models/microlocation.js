import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name      : attr('string'),
  floor     : attr('number'),
  latitude  : attr('number'),
  longitude : attr('number'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
