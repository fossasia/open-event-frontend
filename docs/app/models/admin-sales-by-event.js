import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  name                  : attr('string'),
  owner                 : attr(),
  type                  : attr(),
  endsAt                : attr('moment'),
  startsAt              : attr('moment'),
  paymentCurrency       : attr('string'),
  completedOrderSales   : attr('number'),
  placedOrderSales      : attr('number'),
  pendingOrderSales     : attr('number'),
  completedOrderTickets : attr('number'),
  placedOrderTickets    : attr('number'),
  pendingOrderTickets   : attr('number'),
  sales                 : attr(),
  ownerId               : attr()
});
