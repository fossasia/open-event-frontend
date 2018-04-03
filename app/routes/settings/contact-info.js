import Route from '@ember/routing/route';

export default Route.extend({
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
