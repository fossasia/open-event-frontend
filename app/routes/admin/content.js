import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ContentRoute extends Route {
  titleToken() {
    return this.l10n.t('Content');
  }
}
