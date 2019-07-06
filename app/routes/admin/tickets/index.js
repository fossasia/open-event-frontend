import Route from '@ember/routing/route';

export default class extends Route {
  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('admin.tickets.list', 'all');
  }
}