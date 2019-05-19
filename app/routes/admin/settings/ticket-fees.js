import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Ticket Fees');
  },
  model() {
    return this.store.findAll('ticket-fee');
  },
  actions: {
    willTransition() {
      this.get('controller.model').forEach(ticketFee => {
        ticketFee.rollbackAttributes();
      });
    }
  }
});
