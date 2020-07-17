import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';

@classic
export default class IndexController extends Controller {
  queryParams = ['code'];
  code = null;
  isLoginModalOpen = false;
  userExists = false;

  @computed('model.event.description')
  get htmlSafeDescription() {
    return htmlSafe(this.model.event.description);
  }

  @action
  async createNewUserViaEmail(email) {
    this.set('isLoading', true);
    let newUser = this.store.createRecord('user', {
      email,
      'password'               : (Math.random() * 10).toString(16),
      'wasRegisteredWithOrder' : true
    });
    newUser.save()
      .then(() => {
        let credentials = newUser.getProperties('email', 'password'),
            authenticator = 'authenticator:jwt';
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
            this.notify.error(this.l10n.t(error.errors[0].detail));
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
    let credentials = {
      username,
      password
    };
    let authenticator = 'authenticator:jwt';
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
            this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
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
      this.set('isLoginModalOpen', true);
      return;
    }
    this.send('save');
  }

  @action
  async save() {
    try {
      this.set('isLoading', true);
      const { orderInput } = this;
      try {
        const order = await this.loader.post('/orders/create-order', orderInput);
        this.notify.success(this.l10n.t(`Order details saved. Please fill further details within ${this.settings.orderExpiryTime} minutes.`));
        this.transitionToRoute('orders.new', order.data.attributes.identifier);
      } catch (e) {
        console.error('Error while saving order', e);
        this.notify.error(this.l10n.t(e.response.errors[0].detail));
      } finally {
        this.set('isLoading', false);
      }
    } catch (e) {
      console.error('Error while creating order', e);
      this.notify.error(this.l10n.t(e));
    }
  }
}
