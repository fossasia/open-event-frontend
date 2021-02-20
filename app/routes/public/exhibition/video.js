import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
@classic
export default class VideoRoute extends Route {
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
    const stream = this.store.createRecord('video-stream', {
      name  : exhibitor.name,
      event : await event
    });

    return hash({
      exhibitor,
      event  : await event,
      stream : await stream
    });
  }
}
