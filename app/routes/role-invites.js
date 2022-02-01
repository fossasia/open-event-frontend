import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class RoleInvitesRoute extends Route {
  @service
  fastboot;

  redirectionParams = null;

  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot) {return}
    const { token } = transition.to.queryParams;
    const payload = {
      data: { token }
    };

    const user = await this.loader.post('/role_invites/user', payload);

    if (this.session.isAuthenticated) {

      if (this.authManager.currentUser.email === user.email) {
        const invite = await this.loader.post('/role_invites/accept-invite', payload);
        return this.transitionTo('events.view', invite.event_identifier);
      }

      this.set('session.skipRedirectOnInvalidation', true);
      this.session.invalidate();
    }
    this.set('redirectionParams',  {
      queryParams: {
        inviteToken : token,
        inviteEmail : user.email
      }
    });

  }

  async afterModel() {
    if (this.fastboot.isFastBoot) {return}
    const payload = {
      email: this.redirectionParams.queryParams.inviteEmail
    };
    const response = await this.loader.post('/users/check_email', payload);
    if (response.exists) {
      this.transitionTo('login', this.redirectionParams);
    } else {
      this.transitionTo('register', this.redirectionParams);
    }
  }
}
