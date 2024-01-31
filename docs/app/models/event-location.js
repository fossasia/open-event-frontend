import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';

export default ModelBase.extend({
  name : attr('string'),
  slug : attr('string'),

  events: hasMany('event')
});
