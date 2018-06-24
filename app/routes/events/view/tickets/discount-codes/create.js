import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Create');
  },
  model() {
    return this.get('store').createRecord('discount-code', {
      event    : this.modelFor('events.view'),
      tickets  : [],
      usedFor  : 'ticket',
      marketer : this.get('authManager.currentUser')
    });
  },
  resetController(controller) {
    this._super(...arguments);
    if (!controller.get('model.id')) {
      controller.get('model').unloadRecord();
    }
  },
  afterModel(model) {
    let allTickets = model.event.get('tickets');
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
  }
});
