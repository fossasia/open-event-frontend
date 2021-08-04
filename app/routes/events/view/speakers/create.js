import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class CreateRoute extends Route {
  titleToken() {
    return this.l10n.t('Create session');
  }

  async model() {
    const eventDetails = this.modelFor('events.view');
    return hash({
      event : eventDetails,
      form  : eventDetails.query('customForms', {
        'page[size]' : 0,
        sort         : 'id'
      }),
      session: this.store.createRecord('session', {
        event   : eventDetails,
        creator : this.authManager.currentUser
      }),
      sessions: eventDetails.query('sessions', {
        'page[size]': 0
      }),
      speaker: this.store.createRecord('speaker', {
        user: this.authManager.currentUser
      }),
      tracks       : eventDetails.query('tracks', {}),
      sessionTypes : eventDetails.query('sessionTypes', {})
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const { model } = controller;
    if (!controller.model.speaker.id) {
      model.speaker.unloadRecord();
    }
    if (!controller.model.session.id) {
      model.session.unloadRecord();
    }
  }
}
