import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Revenue');
  },

  model() {
    return RSVP.hash({
      orders : this.store.findAll('admin-sales-fee', { reload: true }).then(orders => orders.sortBy('name')),
      events : this.store.findAll('event', { reload: true }).then(events => events.sortBy('name'))
    });
  },

  afterModel(model) {
    model.orders.forEach((data, index) => data.set('eventDate', model.events[index].startsAtDate));
  },

  setupController(controller, model) {
    controller.set('orders', model.orders);
  }
});
