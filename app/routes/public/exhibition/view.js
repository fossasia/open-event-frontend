import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { set } from '@ember/object';

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

  async afterModel(model) {
    super.afterModel(...arguments);
    if (model.exhibitor.status !== 'accepted') {
      this.transitionTo('not-found');
    }
    const exhibitors = await model.event.query('exhibitors', {
      sort         : 'position',
      'page[size]' : 0
    });
    if (exhibitors) {
      set(model, 'exhibitors', exhibitors);
    }
    return {
      exhibitors
    };
  }
}
