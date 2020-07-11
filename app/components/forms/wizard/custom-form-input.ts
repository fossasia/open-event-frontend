import Component from '@glimmer/component';
import { slugify } from 'open-event-frontend/utils/text';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import DS from 'ember-data';

interface CustomForm { fieldIdentifier: string }

function getIdentifier(name: string, fields: CustomForm[]): string {
  const fieldIdentifiers = new Set(fields.map(field => field.fieldIdentifier));
  let identifier = slugify(name, '_');
  while (fieldIdentifiers.has(identifier)) {
    identifier += '_';
  }

  return identifier;
}

interface Args {
  newFormField: { 
    name: string, 
    type: string 
  }, 
  customForms: CustomForm[], 
  form: string, 
  event: any
}

export default class CustomFormInput extends Component<Args> {

  @service
  store!: DS.Store;

  get identifier(): string {
    return getIdentifier(this.args.newFormField.name, this.args.customForms);
  }

  @computed('args.newFormField.name')
  get validIdentifier(): boolean {
    return this.identifier.trim().length > 0 && this.args.newFormField.name.trim().length > 0;
  }

  @action
  addFormField() {
    if (!this.validIdentifier) {
      return;
    }
    this.args.customForms.pushObject(this.store.createRecord('custom-form', {
      fieldIdentifier : this.identifier,
      name            : this.args.newFormField.name,
      form            : this.args.form,
      type            : this.args.newFormField.type,
      isRequired      : false,
      isIncluded      : false,
      event           : this.args.event
    }));
    set(this.args.newFormField, 'name', '');
  }
}
