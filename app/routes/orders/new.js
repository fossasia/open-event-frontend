import Route from '@ember/routing/route';

export default Route.extend({
  titleToken(model) {
    var order = model.get('identifier');
    return this.get('l10n').t(`New Order -${order}`);
  },

  model(params) {
    return this.store.findRecord('order', params.order_id, {
      include: 'attendees,tickets,event'
    });
  },

  afterModel(model) {
    if (model.get('status') === 'expired') {
      this.transitionTo('orders.expired', model.get('identifier'));
    } else if (model.get('status') === 'completed') {
      this.transitionTo('orders.view', model.get('identifier'));
    } else if (model.get('status') === 'placed') {
      this.transitionTo('orders.placed', model.get('identifier'));
    }
  }
});
