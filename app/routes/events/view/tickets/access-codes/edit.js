import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken(model) {
    let access_code = model.accessCode.get('code');
    return this.l10n.t(access_code.concat('-Edit'));
  },
  model(params) {
    return RSVP.hash({
      accessCode : this.store.findRecord('access-code', params.access_code_id, {}),
      tickets    : this.modelFor('events.view').query('tickets', {})
    });
  },

  async afterModel(model) {
    let tickets = await model.accessCode.tickets;
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
