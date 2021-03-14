import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

@classic
export default class EditRoute extends Route.extend(AuthenticatedRouteMixin) {
  titleToken(model) {
    const sessionTitle = model.stream.name;
    return sessionTitle.concat(' - Edit');
  }

  async model(params) {
    const eventDetails = this.modelFor('events.view');

    return hash({
      event : eventDetails,
      rooms : eventDetails.query('microlocations', {
        'page[size]': 0
      }),
      channels: this.store.query('video-channel', {
        'page[size]': 0
      }),
      stream: this.store.findRecord('video-stream', params.stream_id, {
        include: 'rooms,event,video-channel,moderators'
      })
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    controller.model.stream.rollbackAttributes();
  }
}
