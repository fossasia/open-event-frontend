import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  autoScrollToErrors : false,
  showPasswordForm   : false,

  nextStep: computed('userExists', 'showPasswordForm', function() {
    return this.userExists || this.showPasswordForm;
  }),

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
              prompt : this.l10n.t('Please enter a valid email address')
            }
          ]
        },

        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your password')
            },
            {
              type   : 'minLength[8]',
              prompt : this.l10n.t('Your password must have at least {ruleValue} characters')
            }
          ]
        },

        passwordRepeat: {
          identifier : 'password_repeat',
          rules      : [
            {
              type   : 'match[password]',
              prompt : this.l10n.t('Passwords do not match')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      this.onValid(async() => {
        if (this.userExists) {
          this.loginExistingUser(this.email, this.password);
        } else if (this.password) {
          this.createNewUserViaEmail(this.email, this.password);
        } else {
          const result = await this.loader.post('users/check_email', { email: this.email });
          this.set('userExists', result.exists);
          if (!result.exists) {
            this.set('showPasswordForm', true);
          }
        }
      });
    },
    reset() {
      this.set('userExists', false);
      this.set('showPasswordForm', false);
      this.set('password', null);
    }
  }
});
