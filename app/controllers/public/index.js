import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({

  queryParams: ['code'],

  code: null,

  isLoginModalOpen: false,

  userExists: false,


  htmlSafeDescription: computed('model.event.description', function() {
    return htmlSafe(this.get('model.event.description'));
  }),

  actions: {
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
          credentials.identification = newUser.email;
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

    },

    async loginExistingUser(identification, password) {
      this.set('isLoading', true);
      let credentials = {
        identification,
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
            if (reason && Object.prototype.hasOwnProperty.call(reason, 'status_code') && reason.status_code === 401) {
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

    },

    async placeOrder() {
      if (!this.get('session.isAuthenticated')) {
        this.set('isLoginModalOpen', true);
        return;
      }
      let { order, event } = this.model;
      order.tickets.forEach(ticket => {
        let numberOfAttendees = ticket.orderQuantity;
        while (numberOfAttendees--) {
          this.get('model.attendees').addObject(this.store.createRecord('attendee', {
            firstname : 'John',
            lastname  : 'Doe',
            email     : 'johndoe@example.com',
            event,
            ticket
          }));
        }
      });
      this.send('save');
    },

    async save() {
      try {
        this.set('isLoading', true);
        let order = this.get('model.order');
        let attendees = this.get('model.attendees');
        await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.save()));
        order.set('attendees', attendees);
        await order.save()
          .then(order => {
            this.notify.success(this.l10n.t('Order details saved. Please fill further details within 10 minutes.'));
            this.transitionToRoute('orders.new', order.identifier);
          })
          .catch(async e => {
            await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.destroyRecord()));
            this.notify.error(this.l10n.t(e.errors[0].detail));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      } catch (e) {
        this.notify.error(this.l10n.t(e));
      }
    }
  }

});
