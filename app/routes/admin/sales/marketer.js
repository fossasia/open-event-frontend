import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class MarketerRoute extends Route {
  titleToken() {
    return this.l10n.t('Marketer');
  }

  model() {
    return this.store.findAll('admin-sales-by-marketer');
  }
}
