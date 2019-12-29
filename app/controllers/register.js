import Controller from '@ember/controller';

export default Controller.extend({
  queryParams : ['inviteToken', 'event', 'inviteEmail'],
  event       : null,
  inviteEmail : null,
  inviteToken : null,
  willDestroy() {
    const user = this.model;
    if (user) {
      this.store.unloadRecord(user);
    }
  },

  actions: {
    createUser() {
      const password = this.get('model.password');
      this.model.save()
        .then(user => {
          this.set('session.newUser', user.get('email'));
          if (this.inviteToken) {
            this.send('loginExistingUser', user.get('email'), password, this.inviteToken, this.event);
          } else {
            this.transitionToRoute('login');
          }
        })
        .catch(reason => {
          if (reason && reason.hasOwnProperty('errors') && reason.errors[0].status === 409) {
            this.set('errorMessage', this.l10n.t('User already exists.'));
          } else {
            this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
          }
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },

    async loginExistingUser(identification, password, token, eventId) {
      this.set('isLoading', true);
      let credentials = {
        identification,
        password
      };
      let authenticator = 'authenticator:jwt';
      this.session
        .authenticate(authenticator, credentials)
        .then(async() => {
          const tokenPayload = this.authManager.getTokenPayload();
          if (tokenPayload) {
            this.set('session.skipRedirectOnInvalidation', true);
            this.authManager.persistCurrentUser(
              await this.store.findRecord('user', tokenPayload.identity)
            );
          }

          this.transitionToRoute('public.role-invites', eventId, { queryParams: { token } });
        })
        .catch(reason => {
          if (!(this.isDestroyed || this.isDestroying)) {
            if (reason && reason.hasOwnProperty('status_code') && reason.status_code === 401) {
              this.set('errorMessage', this.l10n.t('Your credentials were incorrect.'));
            } else {
              this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
            }
          } else {
            console.warn(reason);
          }
        })
        .finally(() => {
          this.set('session.skipRedirectOnInvalidation', false);
          this.set('isLoading', false);
        });

    }
  }
});
