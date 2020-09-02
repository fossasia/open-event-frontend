import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

@classic
export default class ProfileRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Profile');
  }

  model() {
    return this.authManager.currentUser;
  }

  @action
  willTransition() {
    this.authManager.currentUser.rollbackAttributes();
  }
}
