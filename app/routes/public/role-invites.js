import Route from '@ember/routing/route';

export default Route.extend({
  redirectionParams: null,
  async beforeModel(transition) {
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
    this.transitionTo('register', this.redirectionParams);
  }
});
