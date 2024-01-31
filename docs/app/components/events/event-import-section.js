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
              prompt : this.l10n.t('Please upload a file')
            },
            {
              type   : 'regExp',
              value  : '/^(.*.((zip|xml|ical|ics|xcal)$))?[^.]*$/i',
              prompt : this.l10n.t('Please upload a file in suggested format')
            }
          ]
        }
      }
    };
  },
  actions: {
    onFileSelected(files) {
      this.set('files', files);
    },
    submit() {
      this.onValid(() => {
        this.uploadFile(this.files);
      });
    }
  }
});
