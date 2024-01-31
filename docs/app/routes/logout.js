import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class LogoutRoute extends Route.extend(AuthenticatedRouteMixin) {
  beforeModel() {
    this.authManager.logout();
    this.transitionTo('index');
  }
}
