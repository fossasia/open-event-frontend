import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class NewSessionRoute extends Route {
  titleToken() {
    return this.l10n.t('New Session');
  }

  async model() {
    const eventDetails = this.modelFor('public');
    return hash({
      event : eventDetails,
      forms : eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      session: this.store.createRecord('session', {
        event       : eventDetails,
        creator     : this.authManager.currentUser,
        track       : null,
        sessionType : null
      }),
      speaker: eventDetails.query('speakers', {
        filter: [
          {
            name : 'email',
            op   : 'eq',
            val  : this.authManager.currentUser.email
          }
        ]
      }),
      tracks       : eventDetails.query('tracks', {}),
      sessionTypes : eventDetails.query('sessionTypes', {})
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.session;
    if (!model.id) {
      controller.model.session.unloadRecord();
    }
  }
}
