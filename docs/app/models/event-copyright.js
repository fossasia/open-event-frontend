import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  holder     : attr('string'),
  holderUrl  : attr('string'),
  licence    : attr('string'),
  licenceUrl : attr('string'),
  year       : attr('number'),
  logoUrl    : attr('string'),

  event: belongsTo('event')
});
