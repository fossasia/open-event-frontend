import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        stripeClientId: {
          identifier : 'stripe_client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the client ID')
            }
          ]
        },

        stripeSecretKey: {
          identifier : 'stripe_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the secret key')
            }
          ]
        },

        stripePublishableKey: {
          identifier : 'stripe_publishable_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the publishable key')
            }
          ]
        },

        paypalBraintreeSandboxAccessToken: {
          identifier : 'sandbox_access_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sandbox braintree paypal access token')
            }
          ]
        },

        paypalBraintreeAccessToken: {
          identifier : 'live_access_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live braintree paypal access token')
            }
          ]
        }
      }
    };
  },

  isCheckedStripe: computed(function() {
    return this.get('settings.stripeClientId');
  }),

  isCheckedPaypal: computed(function() {
    return this.get('settings.paypalBraintreeSandboxAccessToken') || this.get('settings.paypalBraintreeAccessToken');
  }),

  actions: {
    submit() {
      this.onValid(() => {
        if (this.get('isCheckedStripe') === false) {
          this.get('settings').setProperties({
            'stripeClientId'       : null,
            'stripeSecretKey'      : null,
            'stripePublishableKey' : null
          });
        }
        if (this.get('isCheckedPaypal') === false)  {
          this.get('settings').setProperties({
            'paypalBraintreeSandboxAccessToken' : null,
            'paypalBraintreeAccessToken'        : null
          });
        }
        this.sendAction('save');
      });
    }
  }
});
