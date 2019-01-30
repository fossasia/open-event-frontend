import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Reset Password');
  },
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.set('session.skipRedirectOnInvalidation', true);
      this.get('authManager').logout();
    }
  },
  afterModel() {
    this.set('session.skipRedirectOnInvalidation', false);
  }
});
