import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Marketer');
  },

  model() {
    return this.store.query('admin-sales-by-marketer', {
      'page[size]': 10
    });
  }
});
