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

        paypalSandboxClient: {
          identifier : 'sandbox_client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sandbox client id')
            }
          ]
        },

        paypalSandboxSecret: {
          identifier : 'sandbox_secret_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sandbox secret token')
            }
          ]
        },

        paypalClient: {
          identifier : 'client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live client token')
            }
          ]
        },

        paypalSecret: {
          identifier : 'secret_token',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live secret token')
            }
          ]
        },

        omiseTestPublic: {
          identifier : 'test_public_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the public test key')
            }
          ]
        },

        omiseTestSecret: {
          identifier : 'test_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the secret test key')
            }
          ]
        },

        omiseLivePublic: {
          identifier : 'live_public_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the public live key')
            }
          ]
        },

        omiseLiveSecret: {
          identifier : 'live_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the secret live key')
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
    return this.get('settings.paypalSandboxClient') || this.get('settings.paypalClient');
  }),

  isCheckedOmise: computed(function() {
    return this.get('settings.omiseTestPublic') || this.get('settings.omiseLivePublic');
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
            'paypalSandboxClient' : null,
            'paypalSandboxSecret' : null,
            'paypalSecret'        : null,
            'paypalClient'        : null
          });
        }
        if (this.get('isCheckedOmise') === false) {
          this.get('settings').setProperties({
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
