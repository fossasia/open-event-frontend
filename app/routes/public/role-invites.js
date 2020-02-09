import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  fastboot: service(),
  redirectionParams: null,
  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot)
      return;
    const { token } = transition.to.queryParams;
    const originalEventId = transition.resolvedModels.public.originalId;
    const payload = {
      data: { token }
    };

    const user = await this.loader.post('/role_invites/user', payload);

    if (this.session.isAuthenticated) {

      if (this.authManager.currentUser.email === user.email) {
        const invite = await this.loader.post('/role_invites/accept-invite', payload);
        return this.transitionTo('events.view', invite.event);
      }

      this.set('session.skipRedirectOnInvalidation', true);
      this.session.invalidate();
    }
    this.set('redirectionParams',  {
      queryParams: {
        event       : originalEventId,
        inviteToken : token,
        inviteEmail : user.email
      }
    });

  },
  afterModel() {
    if (this.fastboot.isFastBoot)
      return;
    this.transitionTo('register', this.redirectionParams);
  }
});
