import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

@classic
export default class ViewRoute extends Route {
  @service globalData;

  titleToken(model) {
    const order = model.order.get('identifier');
    if (model.order.status === 'completed') {
      return this.l10n.t('Completed Order') + ' - ' + order;
    } else if (model.order.status === 'placed') {
      return this.l10n.t('Placed Order') + ' - ' + order;
    }
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
    this.globalData.saveIdEvent(eventDetails.data.identifier);
    this.globalData.setLogoUrl(eventDetails.data.logoUrl);
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

    return hash({
      order,
      event      : eventDetails,
      tickets,
      taxDetails : eventDetails.isTaxEnabled && eventDetails.get('tax', { cache: true, public: true }),
      form       : eventDetails.query('customForms', {
        'page[size]' : 700,
        sort         : 'id'
      })
    });
  }

  afterModel(model) {
    if (model.order.get('status') === 'expired') {
      this.transitionTo('orders.expired', model.order.get('identifier'));
    } else if (model.order.get('status') === 'completed' || model.order.get('status') === 'placed') {
      this.transitionTo('orders.view', model.order.get('identifier'));
    } else if (model.order.get('status') === 'pending') {
      this.transitionTo('orders.pending', model.order.get('identifier'));
    } else if (model.order.get('status') === 'initializing') {
      this.transitionTo('orders.new', model.order.get('identifier'));
    }
  }
}
