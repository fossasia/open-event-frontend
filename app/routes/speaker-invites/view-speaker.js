import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewSpeakerRoute extends Route {
  titleToken() {
    return this.l10n.t('View Speaker');
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
    const speaker = await speakerInvite.query('speaker', {
      include: 'sessions'
    });
    const session = await speakerInvite.query('session', {
      include: 'speakers'
    });
    return {
      event : eventDetails,
      forms : await eventDetails.query('customForms', {
        filter: [{
          name : 'form',
          op   : 'eq',
          val  : 'speaker'
        }],
        sort         : 'id',
        'page[size]' : 0
      }),
      speaker,
      speakerInvite,
      session
    };
  }
}
