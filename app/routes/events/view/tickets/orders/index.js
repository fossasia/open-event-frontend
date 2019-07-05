import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.tickets.orders.list', 'completed');
  }
});
