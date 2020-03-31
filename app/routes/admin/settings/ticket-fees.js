import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class TicketFeesRoute extends Route {
  titleToken() {
    return this.l10n.t('Ticket Fees');
  }

  model() {
    return this.store.findAll('ticket-fee');
  }

  @action
  willTransition() {
    this.controller.model.forEach(ticketFee => {
      ticketFee.rollbackAttributes();
    });
  }
}
