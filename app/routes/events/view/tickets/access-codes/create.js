import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import moment from 'moment-timezone';
import RSVP from 'rsvp';

@classic
export default class CreateRoute extends Route {
  titleToken() {
    return this.l10n.t('Create');
  }

  async model() {
    return RSVP.hash({
      accessCode: this.store.createRecord('access-code', {
        event         : this.modelFor('events.view'),
        tickets       : [],
        marketer      : this.authManager.currentUser,
        validFromDate : moment(),
        validFromTime : '12:00',
        validTillDate : moment().add(7, 'days'),
        validTillTime : '16:00',
        minQuantity   : 1,
        maxQuantity   : 1
      }),
      tickets: this.modelFor('events.view').query('tickets', { 'page[size]': 0 })
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.accessCode;
    if (!model.id) {
      model.unloadRecord();
    }
  }

  afterModel(model) {
    const allTickets = model.tickets;
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
  }
}
