import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import { slugify } from 'open-event-frontend/utils/text';
import { computed } from '@ember/object';

function getIdentifier(name, fields) {
  const fieldIdentifiers = new Set(fields.map(field => field.fieldIdentifier));
  let identifier = slugify(name, '_');
  while (fieldIdentifiers.has(identifier)) {
    identifier += '_';
  }

  return identifier;
}

export default Component.extend(FormMixin, {
  identifier: computed('data.newFormField.name', 'data.customForms', function() {
    return getIdentifier(this.data.newFormField.name, this.data.customForms);
  }),
  validIdentifier: computed('data.newFormField.name', 'identifier', function() {
    return this.identifier.trim().length > 0 && this.data.newFormField.name.trim().length > 0;
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
    addFormField() {
      if (!this.validIdentifier) {
        return;
      }
      this.data.customForms.pushObject(this.store.createRecord('custom-form', {
        fieldIdentifier : this.identifier,
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
