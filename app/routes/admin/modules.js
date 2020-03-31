import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ModulesRoute extends Route {
  titleToken() {
    return this.l10n.t('Modules');
  }

  model() {
    return this.store.queryRecord('module', {});
  }
}
