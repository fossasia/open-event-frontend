import Route from '@ember/routing/route';

export default Route.extend({

  titleToken(model) {
    return model.get('name');
  },

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'social-links,event-copyright,speakers-call,tax,owner,organizers'
    });
  }
});
