import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Location');
  },
  model() {
    return [{
      location         : 'Delhi',
      completedTickets : 1,
      completedSales   : 0.00,
      placedTickets    : 1,
      placedSales      : 0.00,
      pendingTickets   : 1,
      pendingSales     : 0.00
    }, {
      location         : 'Bangalore',
      completedTickets : 3,
      completedSales   : 23.30,
      placedTickets    : 4,
      placedSales      : 32.00,
      pendingTickets   : 4,
      pendingSales     : 32.00
    }];
  }
});
