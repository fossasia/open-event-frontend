import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Social Links');
  },
  async model() {
    return {
      'eventTopics': await this.get('store').query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),

      'eventTypes': await this.get('store').query('event-type', {})
    };
  },
  setupController(controller, model) {
    this._super(...arguments);
    controller.set('model.eventTypes', model.eventTypes.toArray());
    controller.set('model.eventTopics', model.eventTopics.toArray());
  }
});
