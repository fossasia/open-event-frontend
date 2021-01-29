import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  event : belongsTo('event'),
  role  : belongsTo('role'),
  user  : belongsTo('user')
});
