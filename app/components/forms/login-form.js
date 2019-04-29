import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  identification : '',
  password       : '',
  isLoading      : false,


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
          });
      });
    },

    async auth(provider) {
      try {
        if (provider === 'facebook') {
          this.get('loader').load('/auth/oauth/facebook')
            .then(async response => {
              window.location.replace(response.url);
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