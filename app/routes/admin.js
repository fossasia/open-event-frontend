import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class AdminRoute extends Route.extend(AuthenticatedRouteMixin) {
  beforeModel(transition) {
    super.beforeModel(transition);
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
