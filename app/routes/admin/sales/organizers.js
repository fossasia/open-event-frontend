import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Organizer');
  },

  model() {
    return this.store.query('admin-sales-by-organizer', {});
  }
});
