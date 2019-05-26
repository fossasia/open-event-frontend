import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Discounted Events');
  },

  model() {
    return this.store.query('admin-sales-discounted', {
      'page[size]': 10
    });
  }
});
