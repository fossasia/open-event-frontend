import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Orders');
  },
  model() {
    return this.modelFor('events.view');
  }
});
