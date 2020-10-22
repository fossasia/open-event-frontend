import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class RegisterController extends Controller {
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
      .then(user => {
        this.set('session.newUser', user.get('email'));
        if (this.inviteToken) {
          this.send('loginExistingUser', user.get('email'), password, this.inviteToken, this.event);
        } else {
          this.transitionToRoute('login');
        }
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
        this.transitionToRoute('public.role-invites', eventId, { queryParams: { token } });
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
