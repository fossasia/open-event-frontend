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
    return this.get('value') === this.get('checked');
  }),

  change() {
    this.set('checked', this.get('value'));
  },

  _setCheckedProp() {
    if (!this.$()) { return }
    this.$().prop('checked', this.get('htmlChecked'));
  },

  _updateElementValue: observer('htmlChecked', function() {
    once(this, '_setCheckedProp');
  })
});
