import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class ViewRoute extends Route {
  titleToken(model) {
    return model.exhibitor.title;
  }

  model(params) {
    const event = this.modelFor('public');
    return hash({
      event,
      exhibitor: this.store.findRecord('exhibitor', params.exhibitor_id, { include: 'sessions' })
    });
  }

  afterModel(model) {
    super.afterModel(...arguments);
    if (model.exhibitor.status !== 'accepted') {
      this.transitionTo('not-found');
    }
  }
}
