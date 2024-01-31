import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CreateRoute extends Route {
  titleToken() {
    return this.l10n.t('Create');
  }

  async model() {
    const tickets = await this.modelFor('events.view').query('tickets', {});
    const event = this.modelFor('events.view');
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
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.discountCode;
    if (!model.id) {
      controller.model.discountCode.unloadRecord();
    }
  }

  afterModel(model) {
    const allTickets = model.tickets;
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
    const currentDiscountCode = model.discountCode;
    const event = this.modelFor('events.view');
    currentDiscountCode.set('validTill', event.endsAt);
    currentDiscountCode.set('minQuantity', 1);
    currentDiscountCode.set('maxQuantity', 1);
  }
}
