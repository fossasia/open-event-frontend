import Route from '@ember/routing/route';

export default class ExhibitorsCreateRoute extends Route {

  titleToken() {
    return this.l10n.t('Create Exhibitor');
  }

  async model() {
    const event = this.modelFor('events.view');
    return {
      event,
      exhibitor: await this.store.createRecord('exhibitor', {
        event
      })
    };
  }
}
