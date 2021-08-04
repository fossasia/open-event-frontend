import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
export default class ApplicationSection extends Component {
  @service
  torii;

  isLoading = false;

  @action
  auth(provider) {
    try {
      if (provider === 'facebook') {
        this.torii.open('facebook').then(authData => {
          this.set('isLoading', true);
          this.loader.load(`/auth/oauth/login/${  provider  }/${  authData.authorizationCode  }/?redirect_uri=${  authData.redirectUri}`)
            .then(async response => {
              const credentials = {
                'username' : response.email,
                'password' : response.facebook_login_hash
              };

              const authenticator = 'authenticator:jwt';
              this.session
                .authenticate(authenticator, credentials)
                .then(async() => {
                  const tokenPayload = this.authManager.getTokenPayload();
                  if (tokenPayload) {
                    this.authManager.persistCurrentUser(
                      await this.store.findRecord('user', tokenPayload.identity)
                    );
                    this.set('data', this.authManager.currentUser);
                  }

                  this.set('isLoading', false);
                });
            });
        });
      }
    } catch (error) {
      this.notify.error(error.message, {
        id: 'error_message'
      });
      this.set('isLoading', false);
    }
  }
}
