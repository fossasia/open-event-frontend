import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  identifier  : attr('string'),
  status      : attr('string'),
  amount      : attr('number'),
  createdAt   : attr('moment'),
  completedAt : attr('moment'),
  eventName   : attr('string'),
  sentTo      : attr('string')
});
