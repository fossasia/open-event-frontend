import Route from '@ember/routing/route';

export default Route.extend({

  titleToken(model) {
    var order = model.order.get('identifier');
    return this.get('l10n').t(`New Order -${order}`);
  },

  async model(params) {
    const order = await this.store.findRecord('order', params.order_id, {
      include : 'attendees,event',
      reload  : true
    });
    const tickets = await order.query('tickets', {});
    await tickets.forEach(ticket => {
      ticket.query('attendees', {
        filter: [{
          name : 'order',
          op   : 'has',
          val  : {
            name : 'id',
            op   : 'eq',
            val  : order.originalId
          }
        }]
      });
    });

    const eventDetails = await order.query('event', {});
    return {
      order,
      tickets,
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
