import Component from '@glimmer/component';

interface CustomForm { isComplex: boolean }

interface Args {
  fields: CustomForm[]
 }

export default class CustomFormTable extends Component<Args> {
  get editColumn(): boolean {
    return this.args.fields?.some(field => field.isComplex);
  }
}
