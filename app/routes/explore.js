import Ember from 'ember';
import moment from 'moment';

const { Route, RSVP } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Explore');
  },

  model() {
    return RSVP.hash({
      events: this.store.query('event', {
        sort   : 'starts-at',
        filter : [
          {
            name : 'starts-at',
            op   : 'ge',
            val  : moment().toISOString()
          },
          {
            name : 'state',
            op   : 'eq',
            val  : 'published'
          }
        ]
      }),
      eventTypes  : this.store.findAll('event-type'),
      eventTopics : this.store.findAll('event-topic', { include: 'event-sub-topics' })
    });
  }
});
