import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(transition) {
    let payload = {
      data: {
        token: transition.queryParams.token
      }
    };
    this.loader
      .post('/role_invites/user', payload)
      .then(user => {
        if (this.get('session.isAuthenticated')) {
          if (this.get('authManager.currentUser.email') === user.email) {
            this.loader
              .post('/role_invites/accept-invite', payload)
              .then(invite => {
                this.transitionTo('events.view', invite.event);
              })
              .catch(e => {
                this.notify.error(this.l10n.t('An unexpected error has occurred'));
                console.warn(e);
              });
          } else {
            this.set('session.skipRedirectOnInvalidation', true);
            this.session.invalidate();
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
        this.notify.error(this.l10n.t('An unexpected error has occurred'));
        console.warn(e);
      });
  }
});
