import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { action } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

@classic
export default class LoginForm extends Component.extend(FormMixin) {

  queryParams = ['inviteToken', 'event', 'inviteEmail'];
  event = null;
  inviteEmail = null;
  inviteToken = null;

  identification   = '';
  password         = '';
  isLoading        = false;
  counter          = 0;
  captchaValidated = false;
  showHcaptcha     = !!ENV.hcaptchaKey;
  rememberMe       = false;

  set setSessionCookie(rememberMe) {
    const SECONDS_IN_DAY = 86400;
    const expirationTime = rememberMe ? (365 * SECONDS_IN_DAY) : (1 * SECONDS_IN_DAY);
    this.session.store.cookieExpirationTime = expirationTime;
  }

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
              prompt : this.l10n.t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },
        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your password')
            }
          ]
        }
      }
    };
  }

  @action
  async submit(e) {
    e.preventDefault();
    this.onValid(async() => {
      ENV['ember-simple-auth-token'].refreshAccessTokens = this.rememberMe;
      const credentials = { username: this.identification, password: this.password, 'remember-me': this.rememberMe, 'include-in-response': this.rememberMe };
      const authenticator = 'authenticator:custom-jwt';
      this.setProperties({
        errorMessage : null,
        isLoading    : true
      });
      try {
        await this.session.authenticate(authenticator, credentials);
        const tokenPayload = this.authManager.getTokenPayload();
        if (tokenPayload) {
          this.authManager.persistCurrentUser(
            await this.store.findRecord('user', tokenPayload.identity)
          );
        }
        this.set('setSessionCookie', this.rememberMe);

        if (this.inviteToken) {
          this.transitionToRoute('public.role-invites', this.event, { queryParams: { token: this.inviteToken } });
        }
      } catch (e) {
        this.set('counter', this.counter + 1);
        if (e.json && e.json.error) {
          console.warn('Error while authentication', e);
          this.set('errorMessage', this.l10n.tVar(e.json.error));
        } else {
          console.error('Error while authentication', e);
          this.set('errorMessage', this.l10n.t('An unexpected error has occurred.'));
        }
      }

      if (!(this.isDestroyed || this.isDestroying)) {
        this.setProperties(
          {
            password  : '',
            isLoading : false
          });
      }
    });
  }

  @action
  async auth(provider) {
    if (provider === 'facebook') {
      try {
        const response = await this.loader.load('/auth/oauth/facebook');
        window.location.replace(response.url);
      } catch (e) {
        if (e.message) {
          this.notify.error(this.l10n.tVar(e.message), {
            id: 'error_server_msg'
          });
        } else {
          console.error('Error while facebook authentication', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'), {
            id: 'unexpect_error'
          });
        }
      }
    }
  }

  @action
  showPassword() {
    this.toggleProperty('showPass');
  }

  @action
  toggleRememberMe() {
    this.toggleProperty('rememberMe');
  }


  didInsertElement() {
    if (this.session.newUser) {
      this.setProperties({
        newUser        : this.session.newUser,
        identification : this.session.newUser
      });
      this.session.set('newUser', null);
    }
    ENV['ember-simple-auth-token'].refreshAccessTokens = false;
    this.rememberMe = false;
  }
}
