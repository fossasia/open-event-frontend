import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Create');
  },
  async model() {
    let tickets = await this.modelFor('events.view').query('tickets', {});
    let event = this.modelFor('events.view');
    return {
      discountCode: this.store.createRecord('discount-code', {
        event,
        tickets  : [],
        usedFor  : 'ticket',
        marketer : this.authManager.currentUser
      }),
      tickets,
      event
    };
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.model.discountCode;
    if (!model.id) {
      controller.model.discountCode.unloadRecord();
    }
  },
  afterModel(model) {
    let allTickets = model.tickets;
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
    let currentDiscountCode = model.discountCode;
    let event = this.modelFor('events.view');
    currentDiscountCode.set('validTill', event.endsAt);
    currentDiscountCode.set('minQuantity', 1);
    currentDiscountCode.set('maxQuantity', 1);
  }
});
