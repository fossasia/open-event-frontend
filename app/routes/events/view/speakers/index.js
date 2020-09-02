import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  templateName = 'events/view/speakers/list';

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('events.view.speakers.list', 'all');
  }
}
