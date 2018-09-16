import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log(store, primaryModelClass, payload, id, requestType); /* eslint-disable-line no-console */
    arguments[2].data = payload.data.map(function(b) {
      var a = b.attributes, c = {};
      Object.assign(c, b);
      c.attributes = {
        'events'            : a.name,
        'event-date'        : a.starts_at,
        'completed-tickets' : a.sales.completed.ticket_count,
        'completeds-sales'  : a.sales.completed.sales_total,
        'placed-tickets'    : a.sales.placed.ticket_count,
        'placed-sales'      : a.sales.placed.sales_total,
        'pending-tickets'   : a.sales.pending.ticket_count,
        'pending-sales'     : a.sales.pending.sales_total

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
