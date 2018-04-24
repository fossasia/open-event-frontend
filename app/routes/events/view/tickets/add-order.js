import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Add Order');
  },
  model() {
    return this.modelFor('events.view').query('tickets', {});
  }
});
