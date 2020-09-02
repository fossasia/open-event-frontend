import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('account.billing.invoices.list', 'all');
  }
}
