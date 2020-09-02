import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  titleToken() {
    return this.l10n.t('Upcoming');
  }

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.users.view.tickets.list', 'upcoming');
  }
}
