import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class AdminRoute extends Route {
  beforeModel(transition) {
    super.beforeModel(transition);
    let isAuthenticated = requireAuthentication(getOwner(this), transition);
    if (isAuthenticated) {
      if (!this.authManager.currentUser.isAdmin) {
        throw {
          errors: [
            { status: 403 }
          ]
        };
      }
    } 
  }

  titleToken() {
    return this.l10n.t('Administration');
  }
}
