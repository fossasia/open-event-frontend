import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

export default Controller.extend({

  paymentDescription: 'Please fill your card details to proceed',

  isStripe: computed('model.order', function() {
    return this.get('model.order.paymentMode') === 'stripe';
  }),

  isPaypal: computed('model.order', function() {
    return this.get('model.order.paymentMode') === 'paypal';
  }),

  isOmise: computed('model.order', function() {
    return this.get('model.order.paymentMode') === 'omise';
  }),

  paymentAmount: computed('model.order', function() {
    return this.get('model.order.amount') * 100;
  }),

  publicKeyOmise: computed('settings.omiseLivePublic', function() {
    return this.get('settings.omiseLivePublic') || this.get('settings.omiseTestPublic');
  }),

  omiseFormAction: computed('model.order', function() {
    let identifier = this.get('model.order.identifier');
    return `${ENV.APP.apiHost}/v1/orders/${identifier}/omise-checkout`;
  }),

  actions: {
    processStripeToken(token) {
      // Send this token to server to process payment
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
        });
    },

  omiseCheckout(order_identifier) {
    console.log('in omise action checlout');
    var data = window.$("input[name=omiseToken]");
    let payload = {
      'omiseToken' : data.prevObject['0'].location.search
    }
    this.loader.post(`orders/${order_identifier}/omise-checkout`, payload)
      .then(charge => {
        if (charge.status) {
          this.notify.success('Payment has succeeded');
          this.transitionToRoute('orders.view', order_identifier);
        } else {
          this.notify.error('Payment has failed');
        }
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
