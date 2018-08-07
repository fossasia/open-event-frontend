import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default ModelBase.extend({
  canDelete : attr('boolean'),
  canUpdate : attr('boolean'),
  canCreate : attr('boolean'),
  canRead   : attr('boolean'),

  role        : belongsTo('role'),
  service     : belongsTo('service'),
  serviceName : computed.alias('service.name')
});
