import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface Args {
  prefix: string | undefined,
  value: string | undefined,
  onChange: (text: string) => void
}

export default class LinkField extends Component<Args> {
  @tracked
  value = '';

  constructor(owner: unknown, args: Args) {
    super(owner, args)
    this.value = this.parseValue();
  }

  parseValue(): string {
    const { value } = this.args;
    if (!value)
      return '';
    return this.fixValue(value);
  }

  get prefix(): string {
    return this.args.prefix ?? 'https://'
  }

  get finalValue(): string {
    return this.prefix + this.fixedValue;
  }

  get fixedValue() {
    return this.fixValue(this.value);
  }

  fixValue(value: string): string {
    const splitted = value.split(this.prefix);
    return splitted[1] || splitted[0];
  }

  @action
  setValue(event: any) {
    const text = event.target.value;
    this.value = this.fixValue(text);
    this.args.onChange(this.finalValue);
  }

}
