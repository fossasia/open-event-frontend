import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  oneDay     : attr('number'),
  threeDays  : attr('number'),
  sevenDays  : attr('number'),
  thirtyDays : attr('number')
});
