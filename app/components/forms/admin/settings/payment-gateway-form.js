import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

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

        sandboxUsername: {
          identifier : 'sandbox_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the sadnbox username')
            }
          ]
        },

        sandboxPassword: {
          identifier : 'sandbox_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the sandbox password')
            }
          ]
        },

        sandboxSignature: {
          identifier : 'sandbox_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the sandbox signature')
            }
          ]
        },

        liveUsername: {
          identifier : 'live_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live username')
            }
          ]
        },

        livePassword: {
          identifier : 'live_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live password')
            }
          ]
        },

        liveSignature: {
          identifier : 'live_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the live signature')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
      });
    }
  }
});
