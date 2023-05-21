import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class AdminRoute extends Route {
  session = service();

  beforeModel(transition) {
    super.beforeModel(transition);
    this.get('session').requireAuthentication(transition, 'login');
    if (!this.authManager.currentUser.isAdmin) {
      throw {
        errors: [
          { status: 403 }
        ]
      };
    }
  }

  titleToken() {
    return this.l10n.t('Administration');
  }
}
