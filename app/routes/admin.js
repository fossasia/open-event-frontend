import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { requireAuthentication } from 'ember-simple-auth/addon/-internals/routing';

@classic
export default class AdminRoute extends Route {
  beforeModel(transition) {
    super.beforeModel(transition);
    if (!this.authManager.currentUser.isAdmin) {
      throw {
        errors: [
          { status: 403 }
        ]
      };
    }
    requireAuthentication(transition, '/login');
  }

  titleToken() {
    return this.l10n.t('Administration');
  }
}
