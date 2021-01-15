import Component from '@glimmer/component';

interface CustomForm { isComplex: boolean }

interface Args {
  fields: CustomForm[],
  removeField: (field: any) => void,
  updateField: (field: any) => void
 }

export default class CustomFormTable extends Component<Args> {
  get editColumn(): boolean {
    return this.args.fields?.some(field => field.isComplex);
  }
}
