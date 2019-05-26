import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Organizer');
  },

  model() {
    return this.store.query('admin-sales-by-organizer', {
      'page[size]': 10
    });
  }
});
