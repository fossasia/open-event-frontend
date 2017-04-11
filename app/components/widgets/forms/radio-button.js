import Ember from 'ember';

const { Component, run: { next }, observer, computed } = Ember;

export default Component.extend({

  tagName           : 'input',
  type              : 'radio',
  attributeBindings : ['type', 'radioChecked:checked', 'value', 'name', 'disabled'],

  _elementUpdateObserver: observer('radioChecked', function() {
    next(this, () => {
      this.$().prop('checked', this.get('radioChecked')).trigger('change');
    });
  }),

  radioChecked: computed('value', 'checked', function() {
    return this.get('value') === this.get('checked');
  }),

  change() {
    this.set('checked', this.get('value'));
  }
});
