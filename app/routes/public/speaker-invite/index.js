import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SpeakerInviteRoute extends Route {
  titleToken() {
    return this.l10n.t('Speaker Invites');
  }

  async beforeModel() {
    const eventDetails = await this.modelFor('public');
    this.transitionTo('public.cfs', eventDetails.identifier);
  }

}
