import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Schedule');
  },

  async model() {
    return {
      event: this.modelFor('public')
    };
  }
});
