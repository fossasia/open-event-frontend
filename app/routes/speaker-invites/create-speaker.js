import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class CreateSpeakerRoute extends Route {
  titleToken() {
    return this.l10n.t('New Speaker');
  }

  async beforeModel(transition) {
    try {
      const { token } = transition.to.queryParams;
      if (!token) {
        this.transitionTo('not-found');
      }
      const payload = {
        data: { token }
      };

      const data = await this.loader.post('/speaker_invites/data', payload);
      if (data.status !== 'pending') {
        this.transitionTo('not-found');
      }
      this.set('inviteData', data);
    } catch {
      this.transitionTo('not-found');
    }
  }

  async model() {
    const speakerInvite = await this.store.findRecord('speaker-invite', this.inviteData.invite_id);
    const eventDetails = await speakerInvite.query('event', {});
    const session = await speakerInvite.query('session', {
      include: 'speakers'
    });
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
      }),
      speakerInvite,
      session
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
