import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  isLoading: false,

  paymentDescription: 'Please fill your card details to proceed',

  isStripe: computed('model.order', function() {
    return this.get('model.order.paymentMode') === 'stripe';
  }),

  isPaypal: computed('model.order', function() {
    return this.get('model.order.paymentMode') === 'paypal';
  }),

  paymentAmount: computed('model.order', function() {
    return this.get('model.order.amount') * 100;
  }),

  actions: {
    processStripeToken(token) {
      // Send this token to server to process payment
      this.set('isLoading', true);
      let order = this.get('model.order');
      let chargePayload = {
        'data': {
          'attributes': {
            'stripe'            : token.id,
            'paypal_payer_id'   : null,
            'paypal_payment_id' : null
          },
          'type': 'charge'
        }
      };
      let config = {
        skipDataTransform: true
      };
      chargePayload = JSON.stringify(chargePayload);
      return this.loader.post(`orders/${order.identifier}/charge`, chargePayload, config)
        .then(charge => {
          if (charge.data.attributes.status) {
            this.notify.success(charge.data.attributes.message);
            this.transitionToRoute('orders.view', order.identifier);
          } else {
            this.notify.error(charge.data.attributes.message);
          }
        })
        .catch(e => {
          console.warn(e);
          this.notify.error(this.l10n.t('An unexpected error has occurred'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },

    checkoutClosed() {
      // The callback invoked when stripe Checkout is closed.
    },

    checkoutOpened() {
      // The callback invoked when stripe Checkout is opened.
    }
  }
});
