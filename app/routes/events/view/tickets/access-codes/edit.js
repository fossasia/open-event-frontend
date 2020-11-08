import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const access_code = model.accessCode.get('code');
    return access_code.concat(' - Edit');
  }

  model(params) {
    return RSVP.hash({
      accessCode : this.store.findRecord('access-code', params.access_code_id, {}),
      tickets    : this.modelFor('events.view').query('tickets', {})
    });
  }

  async afterModel(model) {
    const tickets = await model.accessCode.tickets;
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
