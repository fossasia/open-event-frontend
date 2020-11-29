import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { socialMediaExtraPrefixes } from 'open-event-frontend/utils/dictionary/social-media';

interface Args {
  prefix: string | undefined,
  value: string | undefined,
  onChange: (text: string | null) => void
}

export default class LinkField extends Component<Args> {
  @tracked
  value = '';

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.value = this.parseValue();
  }

  /**
   * Parse the value passed in props and seprate the prefix and
   * set the rest as tracked value
   */
  parseValue(): string {
    const { value } = this.args;
    if (!value) {return ''}
    return this.fixValue(value);
  }

  get prefix(): string {
    return this.args.prefix ?? 'https://';
  }

  /**
   * Final value with prefix to be sent to parent component
   */
  get finalValue(): string | null {
    if (!this.fixedValue) {return null;}
    return this.prefix + this.fixedValue;
  }

  get fixedValue(): string {
    return this.fixValue(this.value);
  }

  /**
   * Separate prefix from value
   * @param value string URL to be fixed
   */
  fixValue(value: string): string {
    const splitted = value.split(this.prefix);
    if (!splitted[1]) {
      const extraPrefix = socialMediaExtraPrefixes[this.prefix];
      const extraSplit = value.split(extraPrefix);
      if (extraSplit[1]) {
        return extraSplit[1];
      }
    }
    return splitted[1] || splitted[0];
  }

  @action
  setValue(event: { target: HTMLInputElement }): void {
    const text = event.target.value;
    this.value = this.fixValue(text);
    const finalUrl = this.value ? this.finalValue : null;
    this.args.onChange(finalUrl);
  }

  @action
  prefixUpdated(): void {
    this.args.onChange(this.finalValue);
  }

  @action
  valueUpdated(): void {
    this.value = this.parseValue();
    this.args.onChange(this.finalValue);
  }

}
