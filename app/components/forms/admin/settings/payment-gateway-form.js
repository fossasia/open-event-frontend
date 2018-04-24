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

        sandboxUsername: {
          identifier : 'sandbox_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sadnbox username')
            }
          ]
        },

        sandboxPassword: {
          identifier : 'sandbox_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sandbox password')
            }
          ]
        },

        sandboxSignature: {
          identifier : 'sandbox_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the sandbox signature')
            }
          ]
        },

        liveUsername: {
          identifier : 'live_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live username')
            }
          ]
        },

        livePassword: {
          identifier : 'live_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live password')
            }
          ]
        },

        liveSignature: {
          identifier : 'live_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the live signature')
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
    return this.get('settings.paypalSandboxUsername') || this.get('settings.paypalLiveUsername');
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
            'paypalSandboxUsername'  : null,
            'paypalSandboxPassword'  : null,
            'paypalSandboxSignature' : null,
            'paypalLiveUsername'     : null,
            'paypalLivePassword'     : null,
            'paypalMode'             : null,
            'paypalLiveSignature'    : null
          });
        }
        this.sendAction('save');
      });
    }
  }
});
