import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
@classic
export default class VideoRoute extends Route {
  titleToken(model) {
    return model.title;
  }

  renderTemplate() {
    this.render('public/exhibition/video', { into: 'root' });
  }

  model(params) {
    return this.store.findRecord('exhibitor', params.exhibitor_id, {
      include : 'event',
      reload  : true
    });
  }
}
