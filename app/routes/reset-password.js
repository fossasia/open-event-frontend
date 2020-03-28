import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Reset Password');
  },
  beforeModel() {
    if (this.session.isAuthenticated) {
      this.set('session.skipRedirectOnInvalidation', true);
      this.authManager.logout();
    }
  },
  afterModel() {
    this.set('session.skipRedirectOnInvalidation', false);
  }
});
