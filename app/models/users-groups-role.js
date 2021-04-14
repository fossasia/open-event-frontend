import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  group : belongsTo('group'),
  role  : belongsTo('role'),
  user  : belongsTo('user')
});
