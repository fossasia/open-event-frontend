import Component from '@ember/component';
import { computed } from "@ember/object";
import { fieldTypes } from "open-event-frontend/utils/dictionary/custom-fields";
import FormMixin from 'open-event-frontend/mixins/form';
import { orderBy } from 'lodash-es';

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
  typeList : computed(function() {
    return orderBy(fieldTypes, 'type');
  }),
  normalFields: computed(function() {
    return this.data.customForms.filter(field => {
      return !field.isCustomQuestion;
    });
  }),
  actions: {
    submit(data) {
      let fields = data.customForms;
      let incompleteFields = fields.filter(function(field) {
        return ((!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion);
      });
      if (incompleteFields.length > 0) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.save(data);
        });
      }
    },
    deleteQuestion(field) {
      field.destroyRecord();
    },
    addNewQuestion() {
      let fields = this.data.customForms;
      let incompleteFields = fields.filter(function(field) {
        return ((!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion);
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
