import Controller from '@ember/controller';

export default Controller.extend({
  oauth(queryParams) {
    this.loader.post(`/auth/oauth/login/${ queryParams.provider }?code=${ queryParams.code }`)
      .then(response => {
        let credentials = {
              identification : response.email,
              password       : response.oauth_hash
            },
            authenticator = 'authenticator:jwt';

        this.session
          .authenticate(authenticator, credentials)
          .then(async() => {
            const tokenPayload = this.authManager.getTokenPayload();
            if (tokenPayload) {
              this.authManager.persistCurrentUser(
                await this.store.findRecord('user', tokenPayload.identity)
              );
            }
            this.transitionToRoute('/');
          })
          .catch(reason => {
            if (!(this.isDestroyed || this.isDestroying)) {
              if (reason && Object.prototype.hasOwnProperty.call(reason, 'status_code') && reason.status_code === 401) {
                this.set('errorMessage', this.l10n.t('Your credentials were incorrect.'));
              } else {
                this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
              }
              this.set('isLoading', false);
            } else {
              console.warn(reason);
            }
          })
          .finally(() => {
            if (!(this.isDestroyed || this.isDestroying)) {
              this.set('password', '');
            }
          });
      });
  }
});
