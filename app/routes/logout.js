import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this.get('authManager').logout();
    this.transitionTo('index');
  }
});
