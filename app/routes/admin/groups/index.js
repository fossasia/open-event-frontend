import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'admin/groups/list';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.groups.list', 'live');
  }
}
