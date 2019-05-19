import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Speakers');
  },
  model() {
    return this.modelFor('events.view');
  }
});
