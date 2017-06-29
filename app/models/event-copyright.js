import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  holder     : attr('string'),
  holderUrl  : attr('string'),
  licence    : attr('string'),
  licenceUrl : attr('string'),
  year       : attr('number'),
  logoUrl    : attr('string'),

  event: belongsTo('event')
});
