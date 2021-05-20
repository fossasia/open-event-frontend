import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route {
  titleToken(model) {
    return model.title;
  }

  beforeModel() {
    super.beforeModel(...arguments);
    const event = this.modelFor('public');
    if (!(event.isSchedulePublished)) {
      this.transitionTo('not-found');
    }
  }

  model(params) {
    return this.store.findRecord('session', params.session_id, {
      include: 'session-type,speakers,track,event,favourite'
    });
  }

  afterModel(model) {
    model.query('favourites', {
      include      : 'user',
      'page[size]' : 0
    });
  }
}
