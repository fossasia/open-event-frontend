import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  fixedFields: computed('data.customForms', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  editableFields: computed('data.customForms', function() {
    return this.data.customForms?.filter(field => !field.isFixed);
  }),

  ticketNumber: computed('data.event.tickets', function() {
    return this.data.event.tickets.length > 0 ? true : false;
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
    },
    unpublish() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save', this.data);
      });
    }
  }
});
