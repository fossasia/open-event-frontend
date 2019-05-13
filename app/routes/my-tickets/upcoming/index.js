import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Completed');
  },
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('my-tickets.upcoming.list', 'completed');
  }
});
