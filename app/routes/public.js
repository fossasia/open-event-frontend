import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PublicRoute extends Route {
  titleToken(model) {
    return model.get('name');
  }

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'social-links,event-copyright,speakers-call,tax,owner,organizers,video-stream,custom-forms,group,group.follower'
    });
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('side_panel', null);
    }
  }
}
