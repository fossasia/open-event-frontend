import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class NewRoute extends Route {
  titleToken(model) {
    const order = model.order.get('identifier');
    return this.l10n.t('New Order') + ' - ' + order;
  }

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

    const eventDetails = await order.query('event', { include: 'tax' });

    return hash({
      order,
      event      : eventDetails,
      tickets,
      taxDetails : eventDetails.isTaxEnabled && eventDetails.get('tax', { cache: true, public: true }),
      form       : eventDetails.query('customForms', {
        filter: [
          {
            name : 'form',
            op   : 'eq',
            val  : 'attendee'
          }
        ],
        'page[size]' : 0,
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
    }
  }
}
