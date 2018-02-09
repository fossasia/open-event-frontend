import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

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
        }
      }
    };
  },

  actions: {
    submit() {
      this.onValid(() => {
        this.set('isLoading', true);
        this.get('user').save()
          .then(() => {
            this.get('notify').success(this.l10n.t('Your profile has been updated'));
          })
          .catch(() => {
            this.get('authManager.currentUser').rollbackAttributes();
            this.get('notify').error(this.l10n.t('An unexpected error occurred'));
          })
          .finally(() => {
            this.set('isLoading', false);
          });
      });
    }
  }
});
