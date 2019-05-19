import Route from '@ember/routing/route';
import moment from 'moment';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Create');
  },
  async model() {
    return RSVP.hash({
      accessCode: this.store.createRecord('access-code', {
        event         : this.modelFor('events.view'),
        tickets       : [],
        marketer      : this.get('authManager.currentUser'),
        validFromDate : moment(),
        validFromTime : '12:00',
        validTillDate : moment().add(7, 'days'),
        validTillTime : '16:00',
        minQuantity   : 1,
        maxQuantity   : 1
      }),
      tickets: this.modelFor('events.view').query('tickets', {})
    });
  },
  resetController(controller) {
    this._super(...arguments);
    const model = controller.get('model.accessCode');
    if (!model.id) {
      model.unloadRecord();
    }
  },
  afterModel(model) {
    let allTickets = model.tickets;
    allTickets.forEach(ticket => {
      ticket.set('isChecked', false);
    });
  }
});
