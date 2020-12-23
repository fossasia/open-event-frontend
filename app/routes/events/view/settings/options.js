import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

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
    return {
      event       : await eventDetails,
      roleInvites : await eventDetails.query('roleInvites', {}),
      roles       : await this.store.findAll('role')
    };
  }
}
