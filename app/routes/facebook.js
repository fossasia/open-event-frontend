import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    code: ''
  },
  model(queryParams) {
    this.get('loader').post(`/auth/oauth/login/facebook?code=${ queryParams.code }`)
      .then(response => {
        let credentials = {
              identification : response.email,
              password       : response.oauth_hash
            },
            authenticator = 'authenticator:jwt';

        this.get('session')
          .authenticate(authenticator, credentials)
          .then(async() => {
            const tokenPayload = this.get('authManager').getTokenPayload();
            if (tokenPayload) {
              this.get('authManager').persistCurrentUser(
                await this.get('store').findRecord('user', tokenPayload.identity)
              );
            }
            window.location.replace('/');
            window.close();
          })
          .catch(reason => {
            if (!(this.get('isDestroyed') || this.get('isDestroying'))) {
              if (reason && reason.hasOwnProperty('status_code') && reason.status_code === 401) {
                this.set('errorMessage', this.get('l10n').t('Your credentials were incorrect.'));
              } else {
                this.set('errorMessage', this.get('l10n').t('An unexpected error occurred.'));
              }
              this.set('isLoading', false);
            } else {
              console.warn(reason);
            }
          })
          .finally(() => {
            if (!(this.get('isDestroyed') || this.get('isDestroying'))) {
              this.set('password', '');
            }
          });
      });
  }
});
