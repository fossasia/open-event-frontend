import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Profile');
  },

  model() {
    return this.authManager.currentUser;
  },

  actions: {
    willTransition() {
      this.authManager.currentUser.rollbackAttributes();
    }
  }
});
