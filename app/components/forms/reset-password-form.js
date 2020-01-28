import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { inject as service } from '@ember/service';

export default Component.extend(FormMixin, {

  identification : '',
  password       : '',
  isLoading      : false,
  router         : service(),
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
        },

        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your new password')
            },
            {
              type   : 'minLength[8]',
              prompt : this.l10n.t('Your password must have at least {ruleValue} characters')
            }
          ]
        }
      }
    };
  },

  actions: {
    showPassword(fieldName) {
      this.toggleProperty(`showPass${fieldName}`);
    },
    submit() {
      this.onValid(() => {
        let payload = {};
        if (this.token) {
          payload = {
            'data': {
              'token'    : this.token,
              'password' : this.password
            }
          };
          this.loader
            .patch('auth/reset-password', payload)
            .then(() => {
              this.notify.success(this.l10n.t('Your password has been reset successfully. Please log in to continue'), {
                id: 'reser_succ'
              });
              this.router.transitionTo('login');
            })
            .catch(() => {
              this.set('errorMessage', this.l10n.t('An unexpected error occurred.'), {
                id: 'reset_unexpect'
              });
            })
            .finally(() => {
              this.set('isLoading', false);
              this.set('token', null);
            }
            );
        } else {
          payload = {
            'data': {
              'email': this.identification
            }
          };
          this.loader
            .post('auth/reset-password', payload)
            .then(() => {
              this.notify.success(this.l10n.t('Please go to the link sent to your email to reset your password'), {
                id: 'reset_link_sent'
              });
              this.router.transitionTo('login');
            })
            .catch(reason => {
              if (reason && Object.prototype.hasOwnProperty.call(reason, 'errors') && reason.errors[0].status === 404) {
                this.set('errorMessage', this.l10n.t('No account is registered with this email address.'));
              } else {
                this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
              }
            })
            .finally(() => {
              this.set('isLoading', false);
            });
        }
        this.set('errorMessage', null);
        this.set('successMessage', null);
        this.set('isLoading', true);
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
