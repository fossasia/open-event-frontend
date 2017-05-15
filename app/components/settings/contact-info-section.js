import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

export default Component.extend(FormMixin, {

  email     : '',
  phone     : '',
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
              type   : 'empty',
              prompt : this.i18n.t('Please enter your email ID')
            },
            {
              type   : 'email',
              prompt : this.i18n.t('Please enter a valid email ID')
            }
          ]
        },
        phone: {
          identifier : 'phone',
          rules      : [
            {
              type   : 'empty',
              prompt : this.i18n.t('Please enter your phone')
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