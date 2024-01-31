import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.users.view.events.list', 'live');
  }
}
