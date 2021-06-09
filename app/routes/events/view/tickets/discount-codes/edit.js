import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const discount_code = model.discountCode.get('code');
    return discount_code.concat(' - Edit');
  }

  async model(params) {
    const event = this.modelFor('events.view');
    return hash({
      discountCode : this.store.findRecord('discount-code', params.discount_code_id, {}),
      tickets      : this.modelFor('events.view').query('tickets', {}),
      event
    });
  }

  async afterModel(model) {
    const tickets = await model.discountCode.tickets;
    const allTickets = model.tickets;
    allTickets.forEach(ticket => {
      if (tickets.includes(ticket)) {
        ticket.set('isChecked', true);
      } else {
        ticket.set('isChecked', false);
      }
    });
  }
}
