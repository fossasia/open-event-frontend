import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  classNames: ['ui', 'stackable', 'centered', 'grid'],
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
              prompt : this.get('l10n').t('Please upload a file')
            },
            {
              type   : 'regExp',
              value  : '/^(.*.((zip|xml|ical|ics|xcal)$))?[^.]*$/i',
              prompt : this.get('l10n').t('Please upload a file in suggested format')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit() {
      let _this = this;
      this.onValid(() => {
        _this.sendAction('uploadFile', event.target.getElementsByTagName('input')[0].files);
      });
    }
  }
});
