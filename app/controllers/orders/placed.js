import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  paymentDescription: 'Please fill your card details to proceed',

  isStripe: computed('model', function() {
    return this.get('model.paymentMode') === 'stripe';
  }),

  isPaypal: computed('model', function() {
    return this.get('model.paymentMode') === 'paypal';
  }),

  paymentAmount: computed('model', function() {
    return this.get('model.amount') * 100;
  }),

  actions: {
    processStripeToken() {
      // Send this token to server to process payment
    },

    checkoutClosed() {
      // The callback invoked when Checkout is closed.
      this.get('notify').success(this.get('l10n').t('Your transaction was cancelled'));
    },

    checkoutOpened() {
      // The callback invoked when Checkout is opened.
    }
  }
});
