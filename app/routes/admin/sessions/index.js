import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'admin/sessions/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.sessions.list', 'all');
  }
});
