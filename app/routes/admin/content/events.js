import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EventsRoute extends Route {
  titleToken() {
    return this.l10n.t('Social Links');
  }

  async model() {
    return {
      'eventTopics': await this.store.query('event-topic', {
        sort    : 'name',
        include : 'event-sub-topics'
      }),

      'eventTypes': await this.store.query('event-type', {})
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('model.eventTypes', model.eventTypes.toArray());
    controller.set('model.eventTopics', model.eventTopics.toArray());
  }
}
