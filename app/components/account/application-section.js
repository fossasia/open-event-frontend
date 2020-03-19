import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  torii: service(),

  isLoading: false,

  actions: {
    auth(provider) {
      try {
        if (provider === 'facebook') {
          this.torii.open('facebook').then(authData => {
            this.set('isLoading', true);
            this.loader.load(`/auth/oauth/login/${  provider  }/${  authData.authorizationCode  }/?redirect_uri=${  authData.redirectUri}`)
              .then(async response => {
                let credentials = {
                  'username' : response.email,
                  'password' : response.facebook_login_hash
                };

                let authenticator = 'authenticator:jwt';
                this.session
                  .authenticate(authenticator, credentials)
                  .then(async() => {
                    const tokenPayload = this.authManager.getTokenPayload();
                    if (tokenPayload) {
                      this.authManager.persistCurrentUser(
                        await this.store.findRecord('user', tokenPayload.identity)
                      );
                      this.set('data', this.get('authManager.currentUser'));
                    }

                    this.set('isLoading', false);
                  });
              });
          });
        }
      } catch (error) {
        console.error("Error during authentication", error);
        this.notify.error(this.l10n.t(error.message), {
          id: 'error_message'
        });
        this.set('isLoading', false);
      }
    }
  }
});
