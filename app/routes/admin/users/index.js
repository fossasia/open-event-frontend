import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'admin/users/list';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.users.list', 'all');
  }
}
