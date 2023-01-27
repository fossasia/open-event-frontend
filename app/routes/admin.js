import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


@classic
export default class AdminRoute extends Route {
  @service session;
  async beforeModel(transition) {
    await this.session.setup();
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
