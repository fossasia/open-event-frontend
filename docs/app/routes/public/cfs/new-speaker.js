import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class NewSpeakerRoute extends Route {
  titleToken() {
    return this.l10n.t('New Speaker');
  }

  async model() {
    const eventDetails = this.modelFor('public');
    const { currentUser } = this.authManager;
    let userName;
    if (currentUser.firstName || currentUser.lastName) {
      userName = `${currentUser.firstName} ${currentUser.lastName}`;
    }
    return hash({
      event : eventDetails,
      forms : eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 0
      }),
      speaker: this.store.createRecord('speaker', {
        email    : currentUser.email,
        name     : userName,
        photoUrl : currentUser.avatarUrl,
        event    : eventDetails,
        user     : currentUser
      })
    });
  }

  resetController(controller) {
    super.resetController(...arguments);
    const model = controller.model.speaker;
    if (!model.id) {
      controller.model.speaker.unloadRecord();
    }
  }
}
