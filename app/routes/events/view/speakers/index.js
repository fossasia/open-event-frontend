import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'events/view/speakers/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('events.view.speakers.list', 'all');
  }
});
