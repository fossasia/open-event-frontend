import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    let discount_code = model.discountCode.get('code');
    return this.l10n.t(discount_code.concat('-Edit'));
  },
  model(params) {
    return RSVP.hash({
      discountCode : this.store.findRecord('discount-code', params.discount_code_id, {}),
      tickets      : this.modelFor('events.view').query('tickets', {})
    });
  },

  async afterModel(model) {
    let tickets = await model.discountCode.tickets;
    let allTickets = model.tickets;
    allTickets.forEach(ticket => {
      if (tickets.includes(ticket)) {
        ticket.set('isChecked', true);
      } else {
        ticket.set('isChecked', false);
      }
    });
  }
});
