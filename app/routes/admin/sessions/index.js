import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'admin/sessions/list';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.sessions.list', 'all');
  }
}
