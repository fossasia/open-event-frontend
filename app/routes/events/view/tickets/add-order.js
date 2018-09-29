import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Add Order');
  },
  async model() {
    const eventDetails = this.modelFor('events.view');
    return {
      tickets: await eventDetails.query('tickets', {}),

      order: await this.store.createRecord('order', {
        event     : eventDetails,
        user      : this.get('authManager.currentUser'),
        tickets   : [],
        attendees : []
      }),

      attendees: []
    };
  },
  afterModel(model) {
    let { tickets } = model;
    tickets.forEach(ticket => {
      ticket.set('orderQuantity', 0);
    });
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.order');
    if (!model.id) {
      model.unloadRecord();
    }
  }
});
