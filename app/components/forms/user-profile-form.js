import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { validPhoneNumber } from 'open-event-frontend/utils/validators';

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          identifier : 'name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your name')
            }
          ]
        },
        family: {
          identifier : 'last_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your family name')
            }
          ]
        },
        email: {
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
        phone: {
          identifier : 'phone',
          optional   : true,
          rules      : [
            {
              type   : 'regExp',
              value  : validPhoneNumber,
              prompt : this.l10n.t('Please enter a valid phone number')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.set('isLoading', true);
        this.user.save()
          .then(() => {
            this.notify.success(this.l10n.t('Your profile has been updated'), {
              id: 'profi_update'
            });
          })
          .catch(e => {
            console.error('Error while  updating profile.', e);
            this.authManager.currentUser.rollbackAttributes();
            this.notify.error(this.l10n.t('An unexpected error occurred'), {
              id: 'profi_error'
            });
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      });
    }
  }
});
