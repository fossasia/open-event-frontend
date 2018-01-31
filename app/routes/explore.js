import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Explore');
  },

  model() {
    return RSVP.hash({
      eventTypes  : this.store.findAll('event-type'),
      eventTopics : this.store.findAll('event-topic', { include: 'event-sub-topics' })
    });
  }
});
