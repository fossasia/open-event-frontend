import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Fees');
  },

  model() {
    return this.store.findAll('admin-sales-fee');
  }
});
