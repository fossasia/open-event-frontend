import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class OptionsRoute extends Route {
  titleToken() {
    return this.l10n.t('Options');
  }

  beforeModel() {
    const { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || this.modelFor('events.view').owner.get('email') === currentUser.email)) {
      this.transitionTo('events.view');
    }
  }

  async model() {
    const eventDetails = this.modelFor('events.view');
    return hash({
      event       : eventDetails,
      roleInvites : eventDetails.query('roleInvites', {}),
      roles       : this.store.findAll('role')
    });
  }
}
