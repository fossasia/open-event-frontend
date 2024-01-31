import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class PaymentGatewayRoute extends Route {
  titleToken() {
    return this.l10n.t('Payment Gateway');
  }

  @action
  willTransition() {
    this.controller.model.rollbackAttributes();
  }
}
