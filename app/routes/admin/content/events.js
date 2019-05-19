import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Social Links');
  },
  async model() {
    return {
      'eventTopics': await this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),

      'eventTypes': await this.store.query('event-type', {})
    };
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('model.eventTypes', model.eventTypes.toArray());
    controller.set('model.eventTopics', model.eventTopics.toArray());
  }
});
