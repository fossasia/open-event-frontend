import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  title      : attr('string'),
  message    : attr('string'),
  isRead     : attr('boolean', { defaultValue: false }),
  receivedAt : attr('moment'),

  user: belongsTo('user')
});
