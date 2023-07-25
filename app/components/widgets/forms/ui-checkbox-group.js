import { A } from '@ember/array';
import EmberObject, { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

/**
ui-checkbox-group component see {{#crossLink "mixins.UiCheckboxGroupBase"}}{{/crossLink}}

@module components
@namespace components
@class UiCheckboxGroup
@constructor
*/
export default class UiCheckboxGroupComponent extends Component {
  constructor() {
    super(...arguments);
    this.value = this.args.value ?? A();
  }

  get type() {
    return this.args.type ?? 'checkbox';
  }

  get name() {
    return this.args.name ?? guidFor(this);
  }

  /**
   * name key for option, by default name
   *
   * @property {String} namePath
   * @default 'name'
   */
  get labelPath() {
    return this.args.labelPath ?? 'name';
  }

  /**
   * value key for option, by default value
   *
   * @property {String} valuePath
   * @default 'value'
   */
  get valuePath() {
    return this.args.valuePath ?? 'value';
  }

  /**
   * options for the select component
   *
   * @property {Array} options
   */
  get options() {
    if (!this.args.options) {return A()}
    const _options = A();
    for (let i = 0; i < this.args.options.length; i++) {
      const item = this.args.options[i];
      const label = item.name;
      const value = item.code ? item.code : item.name;
      const checked = item.isChecked ? item.isChecked : this.isOptionChecked(value);
      const obj = EmberObject.create({
        label,
        value: String(value),
        checked
      });
      _options.pushObject(obj);
    }
    return _options;
  }

  isOptionChecked(optionValue) {
    if (this.type === 'checkbox') {
      return this.value.includes(optionValue);
    }

    if (this.type === 'radio') {
      return this.value === optionValue;
    }
  }

  @action
  childOnChange(checked, value) {
    if (this.type === 'checkbox') {
      if (checked && !this.value.includes(value)) {
        this.value.pushObject(value);
      }
      if (!checked && this.value.includes(value)) {
        this.value.removeObject(value);
      }

      if (this.args.onChange) {
        this.args.onChange(checked, value, this.value, this.args.holder, this.args.field);
      }
    }

    if (this.type === 'radio') {
      if (checked) {
        this.value = value;
      }

      if (this.args.onChange) {
        this.args.onChange(checked, value);
      }
    }
  }
}
