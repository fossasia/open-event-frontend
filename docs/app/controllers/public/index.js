import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';
import { tracked } from '@glimmer/tracking';
import ENV from 'open-event-frontend/config/environment';


@classic
export default class IndexController extends Controller {
  queryParams = ['code'];
  code = null;
  isLoginModalOpen = false;
  isContactOrganizerModalOpen = false;
  userExists = false;
  promotionalCodeApplied = false;
  @tracked selectedRegistration = null;

  @computed('model.event.description')
  get htmlSafeDescription() {
    return htmlSafe(this.model.event.description);
  }

  @computed
  get hasOnlyFreeTickets() {
    return !this.model.tickets.toArray().filter(ticket => ticket.type !== 'freeRegistration' && ticket.type !== 'free').length > 0;
  }

  @computed
  get publicStreamLink() {
    let { publicStreamLink } = this.model.event;
    const autoplay = this.model.event.streamAutoplay ? 'autoplay=1' : 'autoplay=0';
    const loop = this.model.event.streamLoop ? '&loop=1' : '&loop=0';

    if (publicStreamLink.includes('vimeo')) {
      const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
      const parsed = publicStreamLink.match(vimeoRegex);
      publicStreamLink = `https://player.vimeo.com/video/${parsed[1]}`;
    } else {
      publicStreamLink = publicStreamLink.replace('watch?v=', 'embed/');
    }
    publicStreamLink += `?${autoplay}${loop}`;

    return publicStreamLink;
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
        ENV['ember-simple-auth-token'].refreshAccessTokens = false;
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
    ENV['ember-simple-auth-token'].refreshAccessTokens = false;
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
  selectTicket(ticket) {
    this.selectedRegistration = ticket;
  }

  @action
  async oneClickSignup(ticket) {
    const input = {
      tickets: [{
        id       : ticket.id,
        quantity : 1,
        price    : ticket.price
      }]
    };

    let myinput = {};
    for (const t of input.tickets) {
      if (t) {
        myinput = {
          tickets: [t]
        };
      }
    }
    if (this.promotionalCodeApplied) {
      myinput['discount-code'] = this.discountCode.id;
    }
    try {
      this.set('orderInput', myinput);
    } catch (e) {
      console.error(e);
    }
  }

  @action
  async removePromotionalCode() {
    this.toggleProperty('enterPromotionalCode');
    this.set('promotionalCodeApplied', false);
    this.set('code', null);
    this.set('promotionalCode', '');
    this.model.tickets.forEach(ticket => {
      ticket.set('discount', null);
      ticket.set('discountedTicketTax', null);
    });
  }

  @action
  async applyPromotionalCode() {
    if (!this.code && !this.promotionalCode) {return}
    if (!this.code) {
      this.set('code', this.promotionalCode);
    }
    try {
      const discountCode = await this.store.queryRecord('discount-code', { eventIdentifier: this.model.event.identifier, code: this.code, include: 'event,tickets' });
      const discountCodeEvent = await discountCode.event;
      if (this.model.event.identifier === discountCodeEvent.identifier) {
        this.set('discountCode', discountCode);
        const tickets = await discountCode.tickets;
        const ticketInput = {
          'discount-code' : discountCode.id,
          'tickets'       : tickets.toArray().map(ticket => ({
            id       : ticket.id,
            quantity : 1,
            price    : ticket.price
          }))
        };
        const ticketAmount = await this.loader.post('/orders/calculate-amount', ticketInput);
        tickets.forEach(ticket => {
          const discountedTicket = ticketAmount.tickets.find(o => {
            return ticket.id === o.id.toString();
          });
          ticket.set('discountedTicketTax', discountedTicket.discounted_tax);
          ticket.set('discount', discountedTicket.discount.amount);
          this.set('invalidPromotionalCode', false);
        });
      } else {
        this.set('invalidPromotionalCode', true);
      }
    } catch (e) {
      console.error('Error while applying discount code as promotional code', e);
      if (!this.invalidPromotionalCode) {
        this.set('invalidPromotionalCode', true);
      }
    }
    if (this.invalidPromotionalCode) {
      this.set('promotionalCodeApplied', false);
      this.notify.error(this.l10n.t('This Promotional Code is not valid'), {
        id: 'prom_inval'
      });
    } else {
      this.set('promotionalCodeApplied', true);
      this.set('promotionalCode', 'Promotional code applied successfully');
    }
  }

  @action
  handleKeyPress() {
    if (event.code === 'Enter') {
      this.send('applyPromotionalCode');
      this.set('code', this.promotionalCode);
    }
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
        this.notify.error(e.response?.errors[0]?.detail);
      } finally {
        this.set('isLoading', false);
      }
    } catch (e) {
      console.error('Error while creating order', e);
      this.notify.error(e);
    }
  }
}
