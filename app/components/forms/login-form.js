import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { action } from '@ember/object';

@classic
export default class LoginForm extends Component.extend(FormMixin) {

  identification = '';
  password       = '';
  isLoading      = false;


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
  async submit() {
    this.onValid(async() => {
      const credentials = { username: this.identification, password: this.password };
      const authenticator = 'authenticator:jwt';
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
      } catch (e) {
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


  didInsertElement() {
    if (this.session.newUser) {
      this.setProperties({
        newUser        : this.session.newUser,
        identification : this.session.newUser
      });
      this.session.set('newUser', null);
    }
  }
}
