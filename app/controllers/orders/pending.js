import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import ENV from 'open-event-frontend/config/environment';

@classic
export default class PendingController extends Controller {
  isLoading = false;
  paymentDescription = 'Please fill your card details to proceed';

  @computed('model.order.paymentMode')
  get isStripe() {
    return this.model.order.paymentMode === 'stripe';
  }

  @computed('model.order.paymentMode')
  get isPaypal() {
    return this.model.order.paymentMode === 'paypal';
  }

  @computed('model.order.paymentMode')
  get isPaytm() {
    return this.model.order.paymentMode === 'paytm';
  }

  @computed('model.order.paymentMode')
  get isOmise() {
    return this.model.order.paymentMode === 'omise';
  }

  @computed('model.order')
  get isAliPay() {
    return this.model.order.paymentMode === 'alipay';
  }

  @computed('model.order')
  get paymentAmount() {
    return this.model.order.amount * 100;
  }

  @computed('settings.omiseLivePublic', 'settings.omiseLivePublic')
  get publicKeyOmise() {
    return this.settings.omiseLivePublic || this.settings.omiseTestPublic;
  }

  @computed('model.order.identifier')
  get omiseFormAction() {
    const { identifier } = this.model.order;
    return `${ENV.APP.apiHost}/v1/orders/${identifier}/omise-checkout`;
  }

  @action
  async alipayCheckout(order_identifier) {
    try {
      const res = await this.loader.load(`alipay/create_source/${order_identifier}`);
      this.notify.success(this.l10n.t('Payment has succeeded'),
        {
          id: 'payment_succ'
        });
      window.location.replace(res.link);
    } catch (error) {
      this.notify.error(error.error);
    }
  }

  @action
  async openPaytmModal() {
    // Model controller for PaytmModal
    try {
      const res = await this.loader.post(`orders/${this.model.order.identifier}/paytm/initiate-transaction`);
      this.setProperties({
        'isPaytmModalOpen' : true,
        'txnToken'         : res.body.txnToken
      });
    } catch (error) {
      this.notify.error(error.error);
    }
  }

  @action
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
      this.notify.error(error.error);
    }
  }

  @action
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
      this.notify.error(error.error);
    }
  }

  @action
  processStripeToken(token) {
    // Send this token to server to process payment
    this.set('isLoading', true);
    const { order } = this.model;
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
    const config = {
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
  }

  @action
  checkoutClosed() {
    // The callback invoked when stripe Checkout is closed.
  }

  @action
  checkoutOpened() {
    // The callback invoked when stripe Checkout is opened.
  }
}
