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
        androidApp: {
          optional   : true,
          identifier : 'android_app',
          rules      : [
            {
              type   : 'url',
              prompt : this.i18n.t('Please enter a valid URL for Android app')
            }
          ]
        },

        webApp: {
          optional   : true,
          identifier : 'web_app',
          rules      : [
            {
              type   : 'url',
              prompt : this.i18n.t('Please enter a valid URL for web app')
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
