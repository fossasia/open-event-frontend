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
      speakers: eventDetails.query('speakers', {
        include      : 'sessions',
        'page[size]' : 0
      }),
      session: this.store.createRecord('session', {
        event    : eventDetails,
        creator  : this.authManager.currentUser,
        startsAt : null,
        endsAt   : null,
        speakers : []
      }),
      speaker: this.store.createRecord('speaker', {
        event : eventDetails,
        user  : this.authManager.currentUser
      }),
      tracks       : eventDetails.query('tracks', { 'page[size]': 0, sort: 'position' }),
      sessionTypes : eventDetails.query('sessionTypes', { 'page[size]': 0, sort: 'position' })
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const { model } = controller;
    if (!model.speaker.id) {
      model.speaker.unloadRecord();
    }
    if (!model.session.id) {
      model.session.unloadRecord();
    }
  }
}
