import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { protocolLessValidUrlPattern } from 'open-event-frontend/utils/validators';

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
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid URL for Android app')
            }
          ]
        },

        webApp: {
          optional   : true,
          identifier : 'web_app',
          rules      : [
            {
              type   : 'regExp',
              value  : protocolLessValidUrlPattern,
              prompt : this.l10n.t('Please enter a valid URL for web app')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      this.onValid(() => {
        this.sendAction('save');
      });
    }
  }
});
