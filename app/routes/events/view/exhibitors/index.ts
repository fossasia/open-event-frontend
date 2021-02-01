import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
type Transition = ReturnType<RouterService['transitionTo']>;

export default class ExhibitorsRoute extends Route {
  beforeModel(transition: Transition): void {
    super.beforeModel(transition);
    this.transitionTo('events.view.exhibitors.list');
  }
}
