import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { set } from '@ember/object';

@classic
export default class ViewRoute extends Route {
  @service
  headData;

  titleToken(model) {
    return model.get('name');
  }

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'event-topic,event-sub-topic,event-type,event-copyright,tax,owner,organizers,coorganizers,track-organizers,registrars,moderators,stripe-authorization'
    });
  }

  afterModel(model) {
    set(this, 'headData.description', model.description);
  }
}
