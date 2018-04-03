import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Discounted Events');
  },

  model() {
    return [
      {
        event            : 'Sample Event',
        discountCode     : 'HINT12',
        marketer         : 'abc@gmail.com',
        completedTickets : 1,
        completedSales   : 0.00,
        placedTickets    : 1,
        placedSales      : 0.00,
        pendingTickets   : 1,
        pendingSales     : 0.00
      },

      {
        event            : 'Sample Event2',
        discountCode     : 'DISC20',
        marketer         : 'xyz@gmail.com',
        completedTickets : 3,
        completedSales   : 23.30,
        placedTickets    : 4,
        placedSales      : 32.00,
        pendingTickets   : 4,
        pendingSales     : 32.00
      },

      {
        event            : 'Sample Event3',
        discountCode     : 'DISC50',
        marketer         : 'sample@gmail.com',
        completedTickets : 6,
        completedSales   : 2.30,
        placedTickets    : 40,
        placedSales      : 32.00,
        pendingTickets   : 42,
        pendingSales     : 36.00
      }
    ];
  }
});
