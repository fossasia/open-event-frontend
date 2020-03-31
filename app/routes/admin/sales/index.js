import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  titleToken() {
    return this.l10n.t('Overview');
  }

  model() {
    return this.store.findAll('admin-sales-by-event');
  }
}
