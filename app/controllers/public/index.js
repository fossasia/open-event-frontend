import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';

@classic
export default class IndexController extends Controller {
  queryParams = ['code'];
  code = null;
  isLoginModalOpen = false;
  isContactOrganizerModalOpen = false;
  userExists = false;

  @computed('model.event.description')
  get htmlSafeDescription() {
    return htmlSafe(this.model.event.description);
  }

  @action
  async createNewUserViaEmail(email, password) {
    this.set('isLoading', true);
    const newUser = this.store.createRecord('user', {
      email,
      password,
      'wasRegisteredWithOrder': true
    });
    newUser.save()
      .then(() => {
        const credentials = newUser.getProperties('email', 'password');
        const authenticator = 'authenticator:jwt';
        credentials.username = newUser.email;
        this.session
          .authenticate(authenticator, credentials)
          .then(async() => {
            const tokenPayload = this.authManager.getTokenPayload();
            if (tokenPayload) {
              this.set('session.skipRedirectOnInvalidation', true);
              await this.authManager.loadUser();
              this.set('isLoginModalOpen', false);
              this.send('placeOrder');
            }
          })
          .catch(reason => {
            console.warn(reason);
          })
          .finally(() => {
            this.set('session.skipRedirectOnInvalidation', false);
          });
      })
      .catch(error => {
        if (error.errors[0]) {
          if (error.errors[0].status === 409) {
            this.set('userExists', true);
          } else {
            this.notify.error(error.errors[0].detail);
          }
        }
      })
      .finally(() => {
        this.set('isLoading', false);
      });

  }

  @action
  async loginExistingUser(username, password) {
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
          await this.authManager.loadUser();
          this.set('isLoginModalOpen', false);
          this.send('placeOrder');
        }
      })
      .catch(reason => {
        if (!(this.isDestroyed || this.isDestroying)) {
          if (reason && reason.status === 401) {
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

  @action
  async placeOrder(orderInput) {
    if (orderInput) {
      this.set('orderInput', orderInput);
    }
    if (!this.session.isAuthenticated) {
      this.set('userExists', false);
      this.flashMessages.add({
        message           : 'In order to buy tickets you need to login. If you have not registered yet, please create an account first. Thank you!',
        type              : 'info',
        preventDuplicates : true
      });
      this.set('isLoginModalOpen', true);
      return;
    }
    this.send('save');
  }

  @action
  openContactOrganizerModal() {
    this.set('isContactOrganizerModalOpen', true);
  }

  @action
  async save() {
    try {
      this.set('isLoading', true);
      const { orderInput } = this;
      try {
        const order = await this.loader.post('/orders/create-order', orderInput);
        this.notify.success(this.l10n.t('Order details saved. Please fill further details within {{time}} minutes.', {
          time: this.settings.orderExpiryTime
        }));
        this.transitionToRoute('orders.new', order.data.attributes.identifier);
      } catch (e) {
        if (e.response?.errors[0]?.source?.code === 'unverified-user') {
          console.warn('Unverified user placing order', e.response);
        } else {
          console.error('Error while saving order', e);
        }
        this.notify.error(e.response.errors[0].detail);
      } finally {
        this.set('isLoading', false);
      }
    } catch (e) {
      console.error('Error while creating order', e);
      this.notify.error(e);
    }
  }
}
