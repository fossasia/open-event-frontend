import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('events.view.tickets.discount-codes.list', 'all');
  }
}
