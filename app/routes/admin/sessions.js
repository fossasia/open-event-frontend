import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { SESSION_STATES } from 'open-event-frontend/utils/dictionary/sessions';

@classic
export default class SessionsRoute extends Route {
  titleToken() {
    return this.l10n.t('Sessions');
  }

  model() {
    return {
      sessionStates: SESSION_STATES
    };
  }
}
