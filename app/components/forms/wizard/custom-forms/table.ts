import Component from '@glimmer/component';
import { action } from '@ember/object';


interface CustomForm { isComplex: boolean }

interface Args {
  fields: CustomForm[]
 }

export default class CustomFormTable extends Component<Args> {
  get editColumn(): boolean {
    return this.args.fields?.some(field => field.isComplex);
  }
}
