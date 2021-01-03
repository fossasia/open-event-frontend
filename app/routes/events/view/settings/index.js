import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'events/view/settings/export';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('events.view.settings.export');
  }
}
