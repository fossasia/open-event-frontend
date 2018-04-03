import Route from '@ember/routing/route';

export default Route.extend({
  templateName: 'events/view/tickets/access-codes/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.tickets.access-codes.list', 'all');
  }
});
