import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Overview');
  },
  async model() {
    return {
      orderStats : await this.modelFor('events.view').query('orderStatistics', {}),
      tickets    : await this.modelFor('events.view').query('tickets', {})
    };
  }
});
