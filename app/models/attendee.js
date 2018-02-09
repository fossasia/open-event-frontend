import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  city        : attr('string'),
  firstname   : attr('string'),
  lastname    : attr('string'),
  isCheckedIn : attr('boolean'),
  state       : attr('string'),
  address     : attr('string'),
  pdfUrl      : attr('string'),
  country     : attr('string'),
  email       : attr('string'),

  event  : belongsTo('event'),
  ticket : belongsTo('ticket'),
  order  : belongsTo('order')
});
