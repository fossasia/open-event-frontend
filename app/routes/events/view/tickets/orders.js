import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class OrdersRoute extends Route {
  titleToken() {
    return this.l10n.t('Orders');
  }

  model() {
    return this.modelFor('events.view');
  }
}
