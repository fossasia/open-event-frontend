import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';

export default ModelBase.extend({
  code          : attr('string'),
  accessUrl     : attr('string'),
  type          : attr('string'),
  isActive      : attr('boolean'),
  ticketsNumber : attr('number'),
  minQuantity   : attr('number'),
  maxQuantity   : attr('number'),
  validFrom     : attr('moment'),
  validTill     : attr('moment'),
  createdAt     : attr('moment'),
  tickets       : attr('string'),
  usedFor       : attr('string'),

  event : belongsTo('event')
});
