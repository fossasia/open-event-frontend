import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  titleToken() {
    return this.l10n.t('Completed');
  }

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('my-tickets.upcoming.list', 'completed');
  }
}
