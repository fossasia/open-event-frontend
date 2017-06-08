import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    return this.transitionTo('admin.permissions.system-roles');
  }
});
