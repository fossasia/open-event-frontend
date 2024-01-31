import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class AddOrderRoute extends Route {
  titleToken() {
    return this.l10n.t('Add Order');
  }

  async model() {
    const eventDetails = this.modelFor('events.view');
    const queryObject = {};
    return {
      tickets    : await eventDetails.query('tickets', queryObject),
      query      : queryObject,
      store      : eventDetails,
      objectType : 'tickets',

      order: await this.store.createRecord('order', {
        event     : eventDetails,
        user      : this.authManager.currentUser,
        tickets   : [],
        attendees : []
      }),

      attendees: []
    };
  }

  afterModel(model) {
    const { tickets } = model;
    tickets.forEach(ticket => {
      ticket.set('orderQuantity', 0);
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.order;
    if (!model.id) {
      model.unloadRecord();
    }
  }
}
