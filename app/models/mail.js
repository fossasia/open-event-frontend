import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({

  action    : attr('string'),
  message   : attr('string'),
  subject   : attr('string'),
  recipient : attr('string'),
  time      : attr('string')
});
