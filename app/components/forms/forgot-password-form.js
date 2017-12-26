import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

export default Component.extend(FormMixin, {

  identification : '',
  password       : '',
  isLoading      : false,

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        identification: {
          identifier : 'email',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.l10n.t('Please enter a valid email ID')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        let payload = {
          'data': {
            'email': this.get('identification')
          }
        };
        this.set('errorMessage', null);
        this.set('successMessage', null);
        this.set('isLoading', true);

        this.get('loader')
          .post('auth/reset-password', payload)
          .then(() => {
            this.set('successMessage', this.l10n.t('Please go to the link sent to your email to reset your password'));
          })
          .catch(reason => {
            if (reason && reason.hasOwnProperty('errors') && reason.errors[0].status === 422) {
              this.set('errorMessage', this.l10n.t('No account is registered with this email address.'));
            } else {
              this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
            }
          })
          .finally(()=> {
            this.set('isLoading', false);
          }
          );
      });
    }
  },

  didInsertElement() {
    if (this.get('session.newUser')) {
      this.set('newUser', this.get('session.newUser'));
      this.set('identification', this.get('session.newUser'));
      this.set('session.newUser', null);
    }
  }
});
