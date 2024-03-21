import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class PublicRoute extends Route {

  @service globalData;
  @service event;

  titleToken(model) {
    return model.get('name');
  }

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'social-links,event-copyright,speakers-call,tax,owner,organizers,video-stream,custom-forms,group,group.followers,group.followers.user'
    });
  }

  afterModel(model) {
    this.globalData.setLogoUrl(model.logoUrl);
    this.globalData.saveIdEvent(model.id);
    this.event.currentEvent = model;

  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('side_panel', null);
    }
  }

}
