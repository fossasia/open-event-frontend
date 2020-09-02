import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

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
            },
            {
              type   : 'regExp',
              value  : '/^(.*.((po)$))?[^.]*$/i',
              prompt : this.l10n.t('Please upload a file in suggested format')
            }
          ]
        },
        language: {
          identifier : 'language',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select a language')
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
