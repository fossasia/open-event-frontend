import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SettingsRoute extends Route {
  titleToken() {
    return this.l10n.t('Settings');
  }

  model() {
    return this.store.queryRecord('setting', {});
  }
}
