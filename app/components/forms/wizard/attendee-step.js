import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

function getIdentifier(name, fields) {
  return name.toLowerCase();
}

export default Component.extend(FormMixin, {
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
    addFormField() {
      this.data.customForms.pushObject(this.store.createRecord('custom-form', {
        fieldIdentifier : getIdentifier(this.data.newFormField.name),
        name            : this.data.newFormField.name,
        form            : 'attendee',
        type            : this.data.newFormField.type,
        isRequired      : false,
        isIncluded      : false,
        event           : this.data.event
      }));
      this.set('data.newFormField.name', '');
    }
  }
});
