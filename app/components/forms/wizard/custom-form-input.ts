import Component from '@glimmer/component';
import { slugify } from 'open-event-frontend/utils/text';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { tracked } from '@glimmer/tracking';

interface CustomForm { fieldIdentifier: string, name: string, type: string, min: number, max: number}

function getIdentifier(name: string, fields: CustomForm[]): string {
  const fieldIdentifiers = new Set(fields.map(field => field.fieldIdentifier));
  let identifier = slugify(name, '_');
  while (fieldIdentifiers.has(identifier)) {
    identifier += '_';
  }

  return identifier;
}

interface Args {
  field: CustomForm | null,
  customForms: CustomForm[],
  form: string,
  event: any,
  min: number | 0,
  max: number | 10,
  onSave: (() => void) | null
}

export default class CustomFormInput extends Component<Args> {

  @tracked
  name = '';

  @tracked
  type = 'text';

  @service
  store!: DS.Store;

  @tracked
  min = 0;

  @tracked
  max = 10;

  @action
  updated(): void {
    if (this.args.field) {
      this.name = this.args.field.name;
      this.type = this.args.field.type;
      this.min = this.args.field.min;
      this.max = this.args.field.max;
    } else {
      this.name = '';
      this.min = 0;
      this.max = 10;
    }
  }

  @computed('name')
  get identifier(): string {
    return getIdentifier(this.name, this.args.customForms);
  }

  @computed('name')
  get validIdentifier(): boolean {
    return this.identifier.trim().length > 0 && this.name.trim().length > 0;
  }

  @computed('name', 'type')
  get field(): CustomForm {
    return this.store.createRecord('custom-form', {
      fieldIdentifier : this.identifier,
      name            : this.name,
      form            : this.args.form,
      type            : this.type,
      isRequired      : false,
      isIncluded      : false,
      isComplex       : true,
      event           : this.args.event,
      min             : this.min,
      max             : this.max,
    });
  }

  @action
  addFormField(): void {
    if (!this.validIdentifier) {
      return;
    }
    if (this.args.field) {
      this.args.field.name = this.name;
      this.args.field.type = this.type;
      this.args.field.fieldIdentifier = this.identifier;
      this.args.field.min = this.min;
      this.args.field.max = this.max;
    } else {
      this.args.customForms.pushObject(this.field);
    }
    this.name = '';
    this.min = 0;
    this.max = 10;

    this.args.onSave && this.args.onSave();
  }
}
