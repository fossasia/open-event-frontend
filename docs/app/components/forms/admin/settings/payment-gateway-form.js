import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import ENV from 'open-event-frontend/config/environment';

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
              prompt : this.l10n.t('Please enter the client ID')
            }
          ]
        },

        stripeSecretKey: {
          identifier : 'stripe_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret key')
            }
          ]
        },

        stripePublishableKey: {
          identifier : 'stripe_publishable_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the publishable key')
            }
          ]
        },
        stripeTestSecretKey: {
          identifier : 'stripe_test_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret test key')
            }
          ]
        },

        stripeTestPublishableKey: {
          identifier : 'stripe_test_publishable_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the publishable test key')
            }
          ]
        },
        alipaySecretKey: {
          identifier : 'alipay_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret key')
            }
          ]
        },

        alipayPublishableKey: {
          identifier : 'alipay_publishable_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the publishable key')
            }
          ]
        },

        paypalSandboxClient: {
          identifier : 'sandbox_client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the sandbox client id')
            }
          ]
        },

        paypalSandboxSecret: {
          identifier : 'sandbox_secret_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the sandbox secret token')
            }
          ]
        },

        paypalClient: {
          identifier : 'client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live client token')
            }
          ]
        },

        paypalSecret: {
          identifier : 'secret_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live secret token')
            }
          ]
        },

        omiseTestPublic: {
          identifier : 'test_public_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the public test key')
            }
          ]
        },

        omiseTestSecret: {
          identifier : 'test_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret test key')
            }
          ]
        },

        omiseLivePublic: {
          identifier : 'live_public_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the public live key')
            }
          ]
        },

        omiseLiveSecret: {
          identifier : 'live_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret live key')
            }
          ]
        },

        paytmLiveMerchant: {
          identifier : 'paytm_live_merchant',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live merchant ID')
            }
          ]
        },

        paytmLiveSecret: {
          identifier : 'paytm_live_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret live key')
            }
          ]
        },

        paytmSandboxMerchant: {
          identifier : 'paytm_sandbox_merchant',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the test merchant ID')
            }
          ]
        },

        paytmSandboxSecret: {
          identifier : 'paytm_sandbox_secret',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the secret test key')
            }
          ]
        }
      }
    };
  },

  isCheckedStripe: computed(function() {
    return this.settings.stripeClientId || this.settings.stripeTestClientId;
  }),

  stripeMode: computed(function() {
    return ENV.environment === 'development' || ENV.environment === 'test' ? 'debug' : 'production';
  }),

  isCheckedPaypal: computed(function() {
    return this.settings.paypalSandboxClient || this.settings.paypalClient;
  }),

  isCheckedOmise: computed(function() {
    return this.settings.omiseTestPublic || this.settings.omiseLivePublic;
  }),

  isCheckedAliPay: computed('settings.alipaySecretKey', 'settings.alipayPublishableKey', function() {
    return this.settings.alipaySecretKey && this.settings.alipayPublishableKey;
  }),

  actions: {
    submit() {
      this.onValid(() => {
        if (this.isCheckedStripe === false) {
          this.settings.setProperties({
            'stripeClientId'       : null,
            'stripeSecretKey'      : null,
            'stripePublishableKey' : null
          });
        }
        if (this.isCheckedPaypal === false)  {
          this.settings.setProperties({
            'paypalSandboxClient' : null,
            'paypalSandboxSecret' : null,
            'paypalSecret'        : null,
            'paypalClient'        : null
          });
        }
        if (!this.isCheckedAliPay) {
          this.settings.setProperties({
            'aliPaySecretKey'      : null,
            'aliPayPublishableKey' : null
          });
        }
        if (this.isCheckedOmise === false) {
          this.settings.setProperties({
            'omiseTestPublic' : null,
            'omiseTestSecret' : null,
            'omiseLivePublic' : null,
            'omiseLiveSecret' : null
          });
        }
        this.sendAction('save');
      });
    }
  }
});
