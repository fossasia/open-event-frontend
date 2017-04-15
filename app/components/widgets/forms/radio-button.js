import Ember from 'ember';

const { Component, run: { once }, observer, computed } = Ember;

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
