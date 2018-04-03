import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Pages');
  },

  model() {
    return this.get('store').findAll('page');
  }
});
