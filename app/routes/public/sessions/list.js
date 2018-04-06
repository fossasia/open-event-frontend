import Route from '@ember/routing/route';

export default Route.extend({
  async model(params) {
    return {
      event : this.modelFor('public'),
      track : await this.store.findRecord('track', params.track_id, { include: 'sessions' })
    };
  }
});
