import Route from '@ember/routing/route';

export default Route.extend({
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
        return this.transitionTo(
          ['organiser', 'coorganizer'].includes(invite.role) ? 'events.view' : 'public', invite.event
        );
      }

      this.set('session.skipRedirectOnInvalidation', true);
      this.session.invalidate();
    }

    this.transitionTo('register', {
      queryParams: {
        event       : originalEventId,
        inviteToken : token,
        inviteEmail : user.email
      }
    });
  }
});