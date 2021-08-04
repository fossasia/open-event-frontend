import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import ENV from 'open-event-frontend/config/environment';

export default Component.extend(FormMixin, {

  email           : '',
  password        : '',
  isLoading       : false,
  captcha         : false,
  showHcaptcha    : !!ENV.hcaptchaKey,
  captchaRendered : false,

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        email: {
          identifier : 'email',
          rules      : [
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
              prompt : this.l10n.t('Please enter a password')
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
  didInsertElement() {
    if (this.inviteEmail) {
      this.data.set('email', this.inviteEmail);
    }
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.set('errorMessage', null);
        this.set('isLoading', true);
        this.sendAction('submit');
      });
    },

    showSignupPassword() {
      this.toggleProperty('showSignupPass');
    },

    showConfirmPassword() {
      this.toggleProperty('showConfirmPass');
    }
  }
});
