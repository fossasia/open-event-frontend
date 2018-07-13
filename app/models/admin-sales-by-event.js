import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { hasMany } from 'ember-data/relationships';

export default ModelBase.extend({
      events           : attr('string'),
      eventDate        : attr('string'),
      completedTickets : attr('number'),
      completedSales   : attr('number'),
      placedTickets    : attr('number'),
      placedSales      : attr('number'),
      pendingTickets   : attr('number'),
      pendingSales     : attr('number')

});
