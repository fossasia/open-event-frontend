import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { attributeBindings, tagName } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import $ from 'jquery';
import Component from '@ember/component';
import { once } from '@ember/runloop';

@classic
@tagName('input')
@attributeBindings('type', 'htmlChecked:checked', 'value', 'name', 'disabled')
export default class RadioButton extends Component {
  type = 'radio';
  @tracked value = null;
  @tracked checked = null;

  get htmlChecked() {
    return this.value === this.checked;
  }

  change() {
    this.set('checked', this.value);
  }

  _setCheckedProp() {
    if (!$(this.element)) { return }
    $(this.element).prop('checked', this.htmlChecked);
  }

  @observes('htmlChecked')
  _updateElementValue() {
    once(this, '_setCheckedProp');
  }
}
