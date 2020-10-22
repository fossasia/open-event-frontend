import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  autoScrollToErrors: false,

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
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      this.onValid(() => {
        if (this.userExists) {
          this.loginExistingUser(this.email, this.password);
        } else {
          this.createNewUserViaEmail(this.email);
        }
      });
    }
  }
});
