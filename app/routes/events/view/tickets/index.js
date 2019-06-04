import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Overview');
  },
  async model() {
    return {
      orderStats  : await this.modelFor('events.view').query('orderStatistics', {}),
      tickets     : await this.modelFor('events.view').query('tickets', {}),
      eventDetail : await this.modelFor('events.view')
    };
  }
});
