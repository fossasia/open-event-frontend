import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('track', params.track_id, { include: 'sessions' });
  }
});
