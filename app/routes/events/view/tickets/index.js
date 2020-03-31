import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  titleToken() {
    return this.l10n.t('Overview');
  }

  async model() {
    return {
      orderStats  : await this.modelFor('events.view').query('orderStatistics', {}),
      tickets     : await this.modelFor('events.view').query('tickets', {}),
      eventDetail : await this.modelFor('events.view')
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('orderStats', model.orderStats);
    this.set('controller', controller);
  }
}
