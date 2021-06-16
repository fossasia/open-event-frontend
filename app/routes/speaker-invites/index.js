import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class SpeakerInvitesRoute extends Route {
  @service
  fastboot;

  @service
  router;

  redirectionParams = null;

  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot) {return}
    const { token } = transition.to.queryParams;
    if (!token) {
      this.transitionTo('not-found');
    }
    const payload = {
      data: { token }
    };
    let user = {};
    try {
      user = await this.loader.post('/speaker_invites/user', payload);
    } catch {
      this.transitionTo('not-found');
    }
    if (this.session.isAuthenticated) {

      if (this.authManager.currentUser.email === user.email) {
        if (user.invite_status !== 'pending') {
          this.transitionTo('not-found');
        } else {
          const speaker = await this.loader.post('/speaker_invites/speaker', payload);
          if (speaker.is_already_created) {
            return this.router.transitionTo('speaker-invites.view-speaker', { queryParams: { token } });
          } else {
            return this.router.transitionTo('speaker-invites.create-speaker', { queryParams: { token } });
          }
        }
      }

      this.set('session.skipRedirectOnInvalidation', true);
      this.session.invalidate();
    }
    this.set('isUserRegistered', user.is_registered);
    this.set('redirectionParams',  {
      queryParams: {
        inviteToken : token,
        inviteEmail : user.email
      }
    });
  }

  afterModel() {
    if (this.fastboot.isFastBoot) {return}
    if (this.isUserRegistered) {
      this.transitionTo('login');
    } else {
      this.transitionTo('register', this.redirectionParams);
    }
  }
}
