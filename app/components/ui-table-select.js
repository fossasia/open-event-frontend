import $ from 'jquery';
import { computed } from '@ember/object';
import UiSelect from 'ember-models-table/components/models-table/select';

export default UiSelect.extend({
  tagName: 'div',

  classNameBindings: ['cssPropertyName', 'aligned'],

  classNames: ['ui', 'search', 'column', 'eight', 'wide'],

  cssPropertyName: '',

  aligned: computed('device.isMobile', function() {
    return this.device.isMobile ? 'center aligned' : 'left aligned';
  }),

  change() {
    this.set('value', $('#table_select', this.element).val());
  }

});
