import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Revenue');
  },

  async model() {
    return this.store.findAll('admin-sales-fee');
  }
});
