import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { computed } from "@ember/object";
import { fieldTypes } from "open-event-frontend/utils/dictionary/custom-fields";
import { orderBy } from 'lodash-es';

export default Component.extend(FormMixin, {
  normalFields: computed(function() {
    return this.data.customForms.filter(field => {
      return !field.isCustomQuestion;
    });
  }),
  typeList : computed(function() {
    return orderBy(fieldTypes, 'type');
  }),
  checkIncompleteFields() {
    let fields = this.data.customForms;
    let incompleteFields = fields.filter(function(field) {
      return ((!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion);
    });
    if (incompleteFields.length > 0) {
      return true
    }
    return false
  },
  actions: {
    saveDraft() {
      let checkFields = this.checkIncompleteFields();
      if (checkFields) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.set('data.event.state', 'draft');
          this.sendAction('save', this.data);
        });
      }
    },
    deleteQuestion(field) {
      field.destroyRecord();
    },
    addNewQuestion() {
      let checkFields = this.checkIncompleteFields();
      if (checkFields) {
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
    },
    move(direction) {
      let checkFields = this.checkIncompleteFields();
      if (checkFields) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.sendAction('move', direction, this.data);
        });
      }
    },
    publish() {
      let checkFields = this.checkIncompleteFields();
      if (checkFields) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.set('data.event.state', 'published');
          this.sendAction('save', this.data);
        });
      }
    }
  }
});
