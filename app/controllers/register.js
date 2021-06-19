import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

@classic
export default class RegisterController extends Controller {
  @service settings;
  queryParams = ['inviteToken', 'event', 'inviteEmail'];
  event = null;
  inviteEmail = null;
  inviteToken = null;

  willDestroy() {
    const user = this.model;
    if (user) {
      this.store.unloadRecord(user);
    }
  }

  @action
  createUser() {
    const { password } = this.model;
    this.model.save()
      .then(async user => {
        this.set('session.newUser', user.get('email'));
        await this.confirm.prompt(this.l10n.t('Thank you for signing up on ' + this.settings.appName + '.com.'), { hideDeny: true, approveText: this.l10n.t('OK'), extra: this.l10n.t('We have sent an email with a verification link to you. Please go to your email account and verify your email to get full access to the system. We are logging you into your newly created account now, but your account functionalities are limited until your email is verified. Please press "Ok" to be redirected to the previous page.') });
        this.send('loginExistingUser', user.get('email'), password, this.inviteToken, this.event);
      })
      .catch(reason => {
        if (reason && Object.prototype.hasOwnProperty.call(reason, 'errors') && reason.errors[0].status === 409) {
          this.set('errorMessage', this.l10n.t('User already exists.'));
        } else if (reason?.errors[0]?.status === '422') {
          this.set('errorMessage', this.l10n.t('Invalid email address.'));
        } else {
          this.set('errorMessage', this.l10n.t('An unexpected error has occurred.'));
        }
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  async loginExistingUser(username, password, token, eventId) {
    this.set('isLoading', true);
    const credentials = {
      username,
      password
    };
    const authenticator = 'authenticator:jwt';
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
        if (token) {
          this.transitionToRoute('public.role-invites', eventId, { queryParams: { token } });
        } else {
          this.transitionToRoute('/');
        }
      })
      .catch(reason => {
        if (!(this.isDestroyed || this.isDestroying)) {
          if (reason && Object.prototype.hasOwnProperty.call(reason, 'errors') && reason.status_code === 401) {
            this.set('errorMessage', this.l10n.t('Your credentials were incorrect.'));
          } else {
            this.set('errorMessage', this.l10n.t('An unexpected error has occurred.'));
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
