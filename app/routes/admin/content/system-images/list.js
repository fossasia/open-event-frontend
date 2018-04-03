import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Sub topics');
  },
  model(params) {
    this.set('params', params);
    return this.store.findRecord('event-topic', params.topic_id, { include: 'event-sub-topics' });
  }
});
