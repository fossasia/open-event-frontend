import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize() {
    const payload = this._super(...arguments);
    payload.data = this.addLinks(payload.data);
    return payload;
  },

  addLinks(ticket) {
    ticket.relationships.orderStatistics = {
      links: {
        related : `/v1/tickets/${ticket.id}/order-statistics`,
        self    : `/v1/tickets/${ticket.id}/order-statistics`
      }
    };
    return ticket;
  }
});
