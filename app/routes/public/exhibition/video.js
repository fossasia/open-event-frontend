import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
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
    const exhibitor = this.store.findRecord('exhibitor', params.exhibitor_id, {
      include : 'event',
      reload  : true
    });
    const stream = this.store.createRecord('video-stream', {
      name  : exhibitor.name,
      event : await event
    });

    return {
      exhibitor : await exhibitor,
      event     : await event,
      stream    : await stream
    };
  }
}
