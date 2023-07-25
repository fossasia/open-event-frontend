import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  titleToken() {
    return this.l10n.t('Overview');
  }

  async model() {
    return hash({
      orderStats  : this.modelFor('events.view').query('orderStatistics', {}),
      tickets     : this.modelFor('events.view').query('tickets', { 'page[size]': 0 }),
      eventDetail : this.modelFor('events.view')
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('orderStats', model.orderStats);
    this.set('controller', controller);
  }
}
