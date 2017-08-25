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
        currentPassword: {
          identifier : 'password_current',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the current password')
            }
          ]
        },
        newPassword: {
          identifier : 'password_new',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a new password')
            },
            {
              type   : 'minLength[6]',
              prompt : this.l10n.t('Your password must have at least {ruleValue} characters')
            }
          ]
        },
        repeatPassword: {
          identifier : 'password_repeat',
          rules      : [
            {
              type   : 'match[password_new]',
              prompt : this.l10n.t('Passwords do not match')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('changePassword', this.getProperties('passwordCurrent', 'passwordNew'));
      });
    }
  }
});
