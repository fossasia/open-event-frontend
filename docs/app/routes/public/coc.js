import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CocRoute extends Route {
  titleToken() {
    return this.l10n.t('Code of Conduct');
  }
}
