import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import $ from 'jquery';

var pwShownConfirm = 0;
var pwShown = 0;

export default Component.extend(FormMixin, {

  email     : '',
  password  : '',
  isLoading : false,

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
              prompt : this.get('l10n').t('Please enter a valid email address')
            }
          ]
        },
        password: {
          identifier : 'password',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter a password')
            },
            {
              type   : 'minLength[6]',
              prompt : this.get('l10n').t('Your password must have at least {ruleValue} characters')
            }
          ]
        },
        passwordRepeat: {
          identifier : 'password_repeat',
          rules      : [
            {
              type   : 'match[password]',
              prompt : this.get('l10n').t('Passwords do not match')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.set('errorMessage', null);
        this.set('isLoading', true);
        this.sendAction('submit');
      });
    },

    showPasswordSignupConfirm() {
      function show() {
        $('#pwdConfirm').attr('type',  'text');
      }
      function hide() {
        $('#pwdConfirm').attr('type', 'password');
      }
      if (pwShownConfirm === 0) {
        pwShownConfirm = 1;
        show();
      } else {
        pwShownConfirm = 0;
        hide();
      }
    },
    showPasswordSignup() {
      function show() {
        $('#pwd').attr('type', 'text');
      }

      function hide() {
        $('#pwd').attr('type', 'password');

      }
      if (pwShown === 0) {
        pwShown = 1;
        show();
      } else {
        pwShown = 0;
        hide();
      }
    }
  }
});
