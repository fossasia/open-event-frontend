import Component from '@ember/component';
import { computed } from '@ember/object';
import { fieldTypes } from 'open-event-frontend/utils/dictionary/custom-fields';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        orderExpiryTime: {
          identifier : 'orderExpiryTime',
          rules      : [
            {
              type   : 'integer[1..60]',
              prompt : this.l10n.t('Please enter a valid registration time limit between 1 to 60 minutes.')
            }
          ]
        }
      }
    };
  },
  typeList: fieldTypes,

  normalFields: computed('data.customForms.@each.isCustomQuestion', function() {
    return this.data.customForms.filter(field => {
      return !field.isCustomQuestion;
    });
  }),
  actions: {
    submit(data) {
      let incompleteFields = data.customForms.filter(function(field) {
        return (!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion;
      });
      if (incompleteFields.length > 0) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.save(data);
        });
      }
    },
    async deleteQuestion(field) {
      await field.destroyRecord();
    },
    addNewQuestion() {
      let incompleteFields = this.data.customForms.filter(function(field) {
        return (!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion;
      });
      if (incompleteFields.length > 0) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.data.customForms.pushObject(this.store.createRecord('custom-form', {
          form             : 'attendee',
          isCustomQuestion : true,
          fieldIdentifier  : '',
          prompt           : null,
          type             : 'text'
        }));
      }
    }
  }
});
