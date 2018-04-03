import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Organizer');
  },

  model() {
    return [
      {
        organizer        : 'Organizer1',
        completedTickets : 3,
        completedSales   : 4,
        placedTickets    : 2,
        placedSales      : 1,
        pendingTickets   : 1,
        pendingSales     : 1
      },
      {
        organizer        : 'Organizer2',
        completedTickets : 1,
        completedSales   : 2,
        placedTickets    : 3,
        placedSales      : 4,
        pendingTickets   : 5,
        pendingSales     : 6
      },
      {
        organizer        : 'Organizer3',
        completedTickets : 3,
        completedSales   : 4,
        placedTickets    : 2,
        placedSales      : 1,
        pendingTickets   : 1,
        pendingSales     : 1
      }
    ];
  }
});
