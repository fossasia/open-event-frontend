import UiSelect from 'ember-models-table/components/models-select';
import Ember from 'ember';
const { computed } = Ember;

export default UiSelect.extend({
  tagName: 'div',

  classNameBindings: ['cssPropertyName', 'aligned'],

  classNames: ['ui', 'search', 'column', 'eight', 'wide'],

  cssPropertyName: '',

  aligned: computed('device.isMobile', function() {
    return this.get('device.isMobile') ? 'center aligned' : 'left aligned';
  }),

  change() {
    this.set('value', this.$('#table_select').val());
  }

});
