import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PendingRoute extends Route {
  titleToken(model) {
    const order = model.order.get('identifier');
    return this.l10n.t('Pending Order')  + ' - ' + order;
  }

  async model(params) {
    try {
      // making the api call to update the order status if its been completed
      await this.loader.post(`orders/${params.order_id}/verify`);
    } catch (e) {
      console.error(e);
    }

    const order = await this.store.findRecord('order', params.order_id, {
      include : 'attendees,tickets,event',
      reload  : true
    });
    const eventDetails = await order.query('event', { include: 'tax' });
    return {
      order,
      event: eventDetails,
      form: await eventDetails.query('customForms', {
        'page[size]' : 70,
        sort         : 'id'
      })
    };
  }

  afterModel(model) {
    if (model.order.get('status') === 'expired') {
      this.transitionTo('orders.expired', model.order.get('identifier'));
    } else if (model.order.get('status') === 'completed' || model.order.get('status') === 'placed') {
      this.transitionTo('orders.view', model.order.get('identifier'));
    } else if (model.order.get('status') === 'pending') {
      this.transitionTo('orders.pending', model.order.get('identifier'));
    }
  }
}
