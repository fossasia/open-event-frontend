import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';

export default Component.extend(FormMixin, {

  identification : '',
  password       : '',
  isLoading      : false,
  torii          : service(),


  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        identification: {
          identifier : 'email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.get('l10n').t('Please enter a valid email ID')
            }
          ]
        },
        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter your password')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        let credentials = this.getProperties('identification', 'password'),
            authenticator = 'authenticator:jwt';

        this.set('errorMessage', null);
        this.set('isLoading', true);

        this.get('session')
          .authenticate(authenticator, credentials)
          .then(async() => {
            const tokenPayload = this.get('authManager').getTokenPayload();
            if (tokenPayload) {
              this.get('authManager').persistCurrentUser(
                await this.get('store').findRecord('user', tokenPayload.identity)
              );
            }
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
            this.get('router').transitionTo('index');
          });
      });
    },

    async auth(provider) {
      try {
        if (provider === 'facebook') {
          this.get('torii').open('facebook').then(authData => {
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
                    }
                  });
              });
          });
        }
      } catch (error) {
        this.get('notify').error(this.get('l10n').t(error.message));
      }
    },

    showPassword() {
      this.toggleProperty('showPass');
    }
  },

  didInsertElement() {
    if (this.get('session.newUser')) {
      this.set('newUser', this.get('session.newUser'));
      this.set('identification', this.get('session.newUser'));
      this.set('session.newUser', null);
    }
  }
});
