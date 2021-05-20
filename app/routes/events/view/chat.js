import Route from '@ember/routing/route';

export default class extends Route {
  titleToken() {
    return this.l10n.t('Chat');
  }

  model() {
    return this.modelFor('events.view');
  }
}
