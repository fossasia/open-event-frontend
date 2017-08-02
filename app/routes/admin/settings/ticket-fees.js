import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Ticket Fees');
  },
  model() {
    return this.get('store').findAll('ticket-fee');
  },
  actions: {
    willTransition() {
      this.get('controller.model').forEach(ticketFee => {
        ticketFee.rollbackAttributes();
      });
    }
  }
});
