import Component from '@glimmer/component';
import { action } from '@ember/object';

interface CustomForm {
  isComplex: boolean,
  isFixed: boolean,
  fieldIdentifier: string,
  name: string,
  mainLanguage: string,
  translations: Translate[],
}

interface Translate {
  name: string,
  code: string,
  isDeleted: boolean,
  id: string,
  form_id: string,
  language_code: string
}

interface Args {
  fields: CustomForm[],
  form: string,
  removeField: (field: any) => void,
  updateField: (field: any) => void
 }

export default class CustomFormTable extends Component<Args> {
  get editColumn(): boolean {
    return this.args.fields?.some(field => !field.isFixed);
  }

  get complexColumn(): boolean {
    return this.args.fields?.some(field => field.isComplex);
  }

  @action
  sortEndAction(fields: []): void {
    fields.forEach((field: any, index: number) => {
      field.position = index;
    });
  }

}
