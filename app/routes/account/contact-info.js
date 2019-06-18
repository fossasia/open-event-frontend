import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Contact Info');
  },
  model() {
    return this.get('authManager.currentUser');
  },
  actions: {
    willTransition() {
      this.get('authManager.currentUser').rollbackAttributes();
    }
  }
});
