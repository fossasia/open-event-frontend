import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route {
  titleToken(model) {
    return model.title;
  }

  model(params) {
    return this.store.findRecord('speaker', params.speaker_id);
  }
}
