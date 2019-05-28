import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    this.authManager.logout();
    this.transitionTo('index');
  }
});
