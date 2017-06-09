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
        stripe_client_id: {
          identifier : 'stripe_client_id',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the client ID')
            }
          ]
        },

        stripe_secret_key: {
          identifier : 'stripe_secret_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the secret key')
            }
          ]
        },

        stripe_publishable_key: {
          identifier : 'stripe_publishable_key',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the publishable key')
            }
          ]
        },

        sandbox_username: {
          identifier : 'sandbox_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the sadnbox username')
            }
          ]
        },

        sandbox_password: {
          identifier : 'sandbox_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the sandbox password')
            }
          ]
        },

        sandbox_signature: {
          identifier : 'sandbox_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the sandbox signature')
            }
          ]
        },

        live_username: {
          identifier : 'live_username',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the live username')
            }
          ]
        },

        live_password: {
          identifier : 'live_password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the live password')
            }
          ]
        },

        live_signature: {
          identifier : 'live_signature',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter the live signature')
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
