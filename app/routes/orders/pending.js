import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PendingRoute extends Route {
  titleToken(model) {
    const order = model.order.get('identifier');
    return this.l10n.t('Pending Order')  + ' - ' + order;
  }

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
