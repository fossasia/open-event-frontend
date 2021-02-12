import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route {
  titleToken(model) {
    return model.title;
  }

  model(params) {
    return this.store.findRecord('exhibitor', params.exhibitor_id);
  }

  afterModel(model) {
    super.afterModel(...arguments);
    if (model.status !== 'accepted') {
      this.transitionTo('not-found');
    }
  }
}
