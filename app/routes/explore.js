import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Explore');
  },

  async model() {
    return {
      eventTypes  : await this.store.findAll('event-type'),
      eventTopics : await this.store.findAll('event-topic', { include: 'event-sub-topics' })
    };
  }
});
