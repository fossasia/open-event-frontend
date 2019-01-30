import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Role-Invite');
  },

  beforeModel(transition) {
    this.controllerFor('events.role-invite').accept(transition.queryParams.id);
  }
});
