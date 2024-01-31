import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'events/view/tickets/access-codes/list';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('events.view.tickets.access-codes.list', 'all');
  }
}
