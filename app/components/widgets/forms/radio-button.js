import $ from 'jquery';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import { computed, observer } from '@ember/object';

export default Component.extend({

  tagName           : 'input',
  type              : 'radio',
  attributeBindings : ['type', 'htmlChecked:checked', 'value', 'name', 'disabled'],

  value   : null,
  checked : null,

  htmlChecked: computed('value', 'checked', function() {
    return this.value === this.checked;
  }),

  change() {
    this.set('checked', this.value);
  },

  _setCheckedProp() {
    if (!$(this.element)) { return }
    $(this.element).prop('checked', this.htmlChecked);
  },

  _updateElementValue: observer('htmlChecked', function() {
    once(this, '_setCheckedProp');
  })
});
