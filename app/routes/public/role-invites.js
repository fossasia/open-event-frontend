import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(transition) {
    let payload = {
      data: {
        token: transition.queryParams.token
      }
    };
    this.get('loader')
      .post('/role_invites/user', payload)
      .then(user => {
        if (this.get('session.isAuthenticated')) {
          if (this.get('authManager.currentUser.email') === user.email) {
            this.get('loader')
              .post('/role_invites/accept-invite', payload)
              .then(invite => {
                this.transitionTo('events.view', invite.event);
              })
              .catch(e => {
                this.get('notify').error(this.get('l10n').t('An unexpected error has occurred'));
                console.warn(e);
              });
          } else {
            this.set('session.skipRedirectOnInvalidation', true);
            this.get('session').invalidate();
            this.transitionTo('register', {
              queryParams: {
                event       : `${transition.params.public.event_id}`,
                inviteToken : `${transition.queryParams.token}`,
                inviteEmail : `${user.email}`
              }
            });

          }
        } else {
          this.transitionTo('register', {
            queryParams: {
              event       : `${transition.params.public.event_id}`,
              inviteToken : `${transition.queryParams.token}`,
              inviteEmail : `${user.email}`
            }
          });
        }
      })
      .catch(e => {
        this.get('notify').error(this.get('l10n').t('An unexpected error has occurred'));
        console.warn(e);
      });
  }
});
