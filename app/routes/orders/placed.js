import Route from '@ember/routing/route';

export default Route.extend({
  titleToken(model) {
    var order = model.order.get('identifier');
    return this.get('l10n').t(`Placed Order -${order}`);
  },

  async model(params) {
    const order = await this.store.findRecord('order', params.order_id, {
      include : 'attendees,tickets,event',
      reload  : true
    });
    const eventDetails = await order.query('event', { include: 'tax' });
    return {
      order,
      form: await eventDetails.query('customForms', {
        'page[size]' : 50,
        sort         : 'id'
      })
    };
  },

  afterModel(model) {
    if (model.order.get('status') === 'expired') {
      this.transitionTo('orders.expired', model.order.get('identifier'));
    } else if (model.order.get('status') === 'completed') {
      this.transitionTo('orders.view', model.order.get('identifier'));
    } else if (model.order.get('status') === 'placed') {
      this.transitionTo('orders.placed', model.order.get('identifier'));
    }
  }
});
