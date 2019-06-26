import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { computed } from '@ember/object';
import { fieldTypes } from 'open-event-frontend/utils/dictionary/custom-fields';

export default Component.extend(FormMixin, {

  normalFields: computed('data.customForms.@each.isCustomQuestion', function() {
    return this.data.customForms.filter(field => {
      return !field.isCustomQuestion;
    });
  }),
  typeList: fieldTypes,
  checkIncompleteFields() {
    let incompleteFields = this.data.customForms.filter(function(field) {
      return (!field.fieldIdentifier || !field.type || field.fieldIdentifier === '') && field.isCustomQuestion;
    });
    if (incompleteFields.length > 0) {
      return true;
    }
    return false;
  },
  actions: {
    saveDraft() {
      if (this.checkIncompleteFields()) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.set('data.event.state', 'draft');
          this.sendAction('save', this.data);
        });
      }
    },
    async deleteQuestion(field) {
      await field.destroyRecord();
    },
    addNewQuestion() {
      if (this.checkIncompleteFields()) {
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
      if (this.checkIncompleteFields()) {
        this.notify.error(this.l10n.t('Existing fields need to be completed before new items can be added.'));
      } else {
        this.onValid(() => {
          this.sendAction('move', direction, this.data);
        });
      }
    },
    publish() {
      if (this.checkIncompleteFields()) {
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
