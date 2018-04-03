import Route from '@ember/routing/route';
export default Route.extend({
  titleToken() {
    return this.l10n.t('Overview');
  },

  model() {
    return [{
      events           : 'Sample Event',
      eventDate        : new Date(),
      completedTickets : 1,
      completedSales   : 2.00,
      placedTickets    : 1,
      placedSales      : 4.40,
      pendingTickets   : 1,
      pendingSales     : 5.00
    }, {
      events           : 'Sample Event',
      eventDate        : new Date(),
      completedTickets : 3,
      completedSales   : 23.30,
      placedTickets    : 4,
      placedSales      : 32.00,
      pendingTickets   : 4,
      pendingSales     : 32.00
    }];
  }
});
