import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Analytics');
  },
  actions: {
    willTransition() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
