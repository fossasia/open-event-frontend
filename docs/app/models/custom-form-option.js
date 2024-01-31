import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({

  value      : attr('string'),
  customForm : belongsTo('customForm')
});
