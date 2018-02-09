import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  templateName: 'admin/users/list',
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('admin.users.list', 'all');
  }
});
