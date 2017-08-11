import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/sessions/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.sessions.list', 'all');
  }
});
