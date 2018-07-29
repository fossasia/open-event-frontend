import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log(store, primaryModelClass, payload, id, requestType); /* eslint-disable-line no-console */
    arguments[2].data = payload.data.map(function(b) {
      var a = b.attributes, c = {};
      Object.assign(c, b);
      c.attributes = {
        events           : a.name,
        eventDate        : a.starts_at,
        completedTickets : a.sales.completed.ticket_count,
        completedSales   : a.sales.completed.sales_total,
        placedTickets    : a.sales.placed.ticket_count,
        placedSales      : a.sales.placed.sales_total,
        pendingTickets   : a.sales.pending.ticket_count,
        pendingSales     : a.sales.pending.sales_total

      }; return c;
    });
    var payload2 = this._super(...arguments);
    return payload2;
  },
  normalize(store, primaryModelClass, payload, id, requestType) {
    console.log('normalize');/* eslint-disable-line no-console */
    console.log(store, primaryModelClass, payload, id, requestType);/* eslint-disable-line no-console */
    var payload2 = this._super(...arguments);
    return payload2;
  }
});
