import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.hash({
      event : this.modelFor('public'),
      track : this.store.findRecord('track', params.track_id, { include: 'sessions' })
    });
  }
});
