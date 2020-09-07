import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  fixedFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  editableFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => !field.isFixed);
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  actions: {
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save', this.data);
      });
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction, this.data);
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save', this.data);
      });
    }
  }
});
