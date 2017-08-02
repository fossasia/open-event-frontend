import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/tickets/access-codes/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.tickets.access-codes.list', 'all');
  }
});
