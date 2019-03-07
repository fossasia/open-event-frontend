import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  torii: service(),

  isLoading: false,

  actions: {
    auth(provider) {
      try {
        if (provider === 'facebook') {
          this.get('torii').open('facebook').then(authData => {
            this.set('isLoading', true);
            this.get('loader').load(`/auth/oauth/login/${  provider  }/${  authData.authorizationCode  }/?redirect_uri=${  authData.redirectUri}`)
              .then(async response => {
                let credentials = {
                  'identification' : response.email,
                  'password'       : response.facebook_login_hash
                };

                let authenticator = 'authenticator:jwt';
                this.get('session')
                  .authenticate(authenticator, credentials)
                  .then(async() => {
                    const tokenPayload = this.get('authManager').getTokenPayload();
                    if (tokenPayload) {
                      this.get('authManager').persistCurrentUser(
                        await this.get('store').findRecord('user', tokenPayload.identity)
                      );
                      this.set('data', this.get('authManager.currentUser'));
                    }
                    this.set('isLoading', false);
                  });
              });
          });
        }
        if (provider === 'instagram') {
          this.get('torii').open('instagram').then(authData => {
            this.set('isLoading', true);
            this.get('loader').load(`/auth/oauth/login/${  provider  }/${  authData.authorizationCode  }/?redirect_uri=${  authData.redirectUri}`)
              .then(async response => {
                let credentials = {
                  'identification' : response.email,
                  'password'       : response.instagram_login_hash
                };

                let authenticator = 'authenticator:jwt';
                this.get('session')
                  .authenticate(authenticator, credentials)
                  .then(async() => {
                    const tokenPayload = this.get('authManager').getTokenPayload();
                    if (tokenPayload) {
                      this.get('authManager').persistCurrentUser(
                        await this.get('store').findRecord('user', tokenPayload.identity)
                      );
                      this.set('data', this.get('authManager.currentUser'));
                    }
                    this.set('isLoading', false);
                  });
              });
          });
        }
      } catch (error) {
        this.get('notify').error(this.get('l10n').t(error.message));
        this.set('isLoading', false);
      }
    }
  }
});
