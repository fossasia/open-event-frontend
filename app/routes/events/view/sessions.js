import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SessionsRoute extends Route {
  titleToken() {
    return this.l10n.t('Sessions');
  }

  model() {
    return this.modelFor('events.view');
  }
}
