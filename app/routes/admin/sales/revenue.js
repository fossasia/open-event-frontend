import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class RevenueRoute extends Route {
  titleToken() {
    return this.l10n.t('Revenue');
  }

  model() {
    return this.store.findAll('admin-sales-fee');
  }
}
