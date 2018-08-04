import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Verify');
  },

  beforeModel(transition) {
    this.controllerFor('verify').verify(transition.queryParams.token);
  }
});
