import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

export default Controller.extend({

  isLoading: false,

  paymentDescription: 'Please fill your card details to proceed',

  isStripe: computed('model.order.paymentMode', function() {
    return this.model.order.paymentMode === 'stripe';
  }),

  isPaypal: computed('model.order.paymentMode', function() {
    return this.model.order.paymentMode === 'paypal';
  }),

  isPaytm: computed('model.order.paymentMode', function() {
    return this.model.order.paymentMode === 'paytm';
  }),

  isOmise: computed('model.order.paymentMode', function() {
    return this.model.order.paymentMode === 'omise';
  }),

  isAliPay: computed('model.order', function() {
    return this.model.order.paymentMode === 'alipay';
  }),

  paymentAmount: computed('model.order', function() {
    return this.model.order.amount * 100;
  }),

  publicKeyOmise: computed('settings.omiseLivePublic', 'settings.omiseLivePublic', function() {
    return this.settings.omiseLivePublic || this.settings.omiseTestPublic;
  }),

  omiseFormAction: computed('model.order.identifier', function() {
    let { identifier } = this.model.order;
    return `${ENV.APP.apiHost}/v1/orders/${identifier}/omise-checkout`;
  }),

  actions: {
    async alipayCheckout(order_identifier) {
      try {
        const res = await this.loader.load(`alipay/create_source/${order_identifier}`);
        this.notify.success(this.l10n.t('Payment has succeeded'),
          {
            id: 'payment_succ'
          });
        window.location.replace(res.link);
      } catch (error) {
        this.notify.error(this.l10n.t(error.error));
      }
    },
    async openPaytmModal() {
      // Model controller for PaytmModal
      try {
        const res = await this.loader.post(`orders/${this.model.order.identifier}/paytm/initiate-transaction`);
        this.setProperties({
          'isPaytmModalOpen' : true,
          'txnToken'         : res.body.txnToken
        });
      } catch (error) {
        this.notify.error(this.l10n.t(error.error));
      }
    },

    async openOTPController(mobileNumber) {
      // Modal controller for OTP step
      try {
        const payload = {
          'data': {
            'phone': mobileNumber
          }
        };
        await this.loader.post(`orders/${this.model.order.identifier}/paytm/send_otp/${this.txnToken}`, payload);
        this.setProperties({
          'isPaytmModalOpen' : false,
          'isOTPModalOpen'   : true
        });
      } catch (error) {
        this.notify.error(this.l10n.t(error.error));
      }
    },

    async verifyOtp(OTP) {
      try {
        const payload = {
          'data': {
            'otp': OTP
          }
        };
        await this.loader.post(`orders/${this.model.order.identifier}/paytm/validate_otp/${this.txnToken}`, payload);
        this.setProperties({
          'isOTPModalOpen': false
        });
      } catch (error) {
        this.notify.error(this.l10n.t(error.error));
      }
    },

    processStripeToken(token) {
      // Send this token to server to process payment
      this.set('isLoading', true);
      let { order } = this.model;
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
          if ('errors' in e) {
            this.notify.error(this.l10n.tVar(e.errors[0].detail),
              {
                id: 'unexpected_error_occur'
              });
          } else {
            this.notify.error(this.l10n.tVar(e),
              {
                id: 'unexpected_error_occur'
              });
          }
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
