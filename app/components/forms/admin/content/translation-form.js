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
        file: {
          identifier : 'file',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please upload a file')
            }
          ]
        },
        language: {
          identifier : 'language',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter select a language')
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
