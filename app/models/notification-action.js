import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  subject    : attr('string'),
  actionType : attr('string'),
  subjectId  : attr('number'),
  link       : attr('string'),

  notification: belongsTo('notification')
});
