import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  resultStatus : attr('string'),
  result       : attr('string'),
  task         : attr('string'),
  startsAt     : attr('moment', { readOnly: true })
});
