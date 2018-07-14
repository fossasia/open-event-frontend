import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Create');
  },
  model() {
    return RSVP.hash({
      discountCode: this.get('store').createRecord('discount-code', {
        event    : this.modelFor('events.view'),
        tickets  : [],
        usedFor  : 'ticket',
        marketer : this.get('authManager.currentUser')
      }),
      tickets: this.modelFor('events.view').query('tickets', {})
    });
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.discountCode');
    if (!model.id) {
      controller.get('model.discountCode').unloadRecord();
    }
  },
  afterModel(model) {
    let allTickets = model.tickets;
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
  }
});
