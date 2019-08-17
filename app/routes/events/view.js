import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  titleToken(model) {
    return model.get('name');
  },

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'event-topic,event-sub-topic,event-type,event-copyright,tax,owner,stripe-authorization'
    });
  },

  afterModel(model) {
    set(this, 'headData.description', model.description);
  }
});
