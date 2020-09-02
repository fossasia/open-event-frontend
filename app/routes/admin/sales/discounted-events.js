import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class DiscountedEventsRoute extends Route {
  titleToken() {
    return this.l10n.t('Discounted Events');
  }

  model() {
    return this.store.findAll('admin-sales-discounted');
  }
}
