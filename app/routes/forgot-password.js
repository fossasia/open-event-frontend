import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Forgot Password');
  }
});
