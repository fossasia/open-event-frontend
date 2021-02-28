import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class VideoRoute extends Route {
  @service event;

  titleToken(model) {
    setTimeout(() => {
      if (window?.document) {
        window.document.title = model.exhibitor.name;
      }
    }, 0);
    return model.exhibitor.name;
  }

  renderTemplate() {
    this.render('public/exhibition/video', { into: 'root' });
  }

  async model(params) {
    const event = this.modelFor('public');
    const exhibitor = await this.store.findRecord('exhibitor', params.exhibitor_id);

    const channel = (await this.store.query('video-channel', {
      filter: [{ name: 'provider', op: 'eq', val: 'jitsi' }]
    })).toArray()[0];

    const stream = this.store.createRecord('video-stream', {
      name         : exhibitor.name,
      url          : channel.get('url') + '/eventyay/exhibitor-' + exhibitor.id,
      videoChannel : channel
    });

    return hash({
      event,
      exhibitor,
      stream
    });
  }

  async afterModel(model) {
    super.afterModel(...arguments);
    if (!model.exhibitor.enableVideoRoom) {
      this.transitionTo('public.exhibition.view', model.event.id, model.exhibitor.id);
    }

    const { can_access } = await this.event.hasStreams(model.event.id);
    if (!can_access) {
      this.transitionTo('public.exhibition.view', model.event.id, model.exhibitor.id, { queryParams: { video_dialog: true } });
    }
  }
}
