import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class EventsRoute extends Route {
  titleToken() {
    return this.l10n.t('Social Links');
  }

  async model() {
    return hash({
      'eventTopics': this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),

      'eventTypes': this.store.query('event-type', {})
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('model.eventTypes', model.eventTypes.toArray());
    controller.set('model.eventTopics', model.eventTopics.toArray());
  }
}
