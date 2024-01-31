import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class PagesRoute extends Route {
  titleToken() {
    return this.l10n.t('Pages');
  }

  model() {
    return this.store.findAll('page');
  }
}
