import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    let discount_code = model.discountCode.get('code');
    return this.l10n.t(discount_code.concat('-Edit'));
  }

  async model(params) {
    let event = this.modelFor('events.view');
    return {
      discountCode : await this.store.findRecord('discount-code', params.discount_code_id, {}),
      tickets      : await this.modelFor('events.view').query('tickets', {}),
      event
    };
  }

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
}
