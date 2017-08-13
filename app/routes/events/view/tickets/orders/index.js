import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.tickets.orders.list', 'all');
  }
});
