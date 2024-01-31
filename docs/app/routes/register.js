import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

@classic
export default class RegisterRoute extends Route.extend(UnauthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Register');
  }

  model() {
    return this.store.createRecord('user');
  }
}
