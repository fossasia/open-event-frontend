import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name : attr('string'),
  slug : attr('string'),

  subTopics : hasMany('event-sub-topic'),
  events    : hasMany('event')
});
