import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  name : attr('string'),
  slug : attr('string'),

  eventTopic  : belongsTo('event-topic'),
  events      : hasMany('event'),
  placeholder : belongsTo('custom-placeholder')
});
