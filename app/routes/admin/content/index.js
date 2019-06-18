import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Social Links');
  },
  model() {
    return this.store.queryRecord('setting', {});
  },
  actions: {
    willTransition() {
      this.get('controller.model').rollbackAttributes();
    }
  }
});
